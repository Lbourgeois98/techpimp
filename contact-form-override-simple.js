/**
 * NUCLEAR FIX - BYPASSES EVERYTHING
 */

(function() {
  console.log('🔥 NUCLEAR FORM FIX LOADED');

  setInterval(function() {
    if (window.location.pathname !== '/contact') return;

    const form = document.querySelector('form');
    if (!form || form.dataset.nuked) return;

    console.log('💣 NUKING FORM');
    form.dataset.nuked = 'true';

    // Get all form elements
    const inputs = form.querySelectorAll('input, select, textarea, button');
    
    // Find the submit button
    const submitBtn = Array.from(inputs).find(el => 
      el.tagName === 'BUTTON' && 
      (el.textContent.includes('Start') || el.textContent.includes('Project') || el.type === 'submit')
    );

    if (!submitBtn) {
      console.log('❌ NO SUBMIT BUTTON FOUND');
      return;
    }

    console.log('✅ SUBMIT BUTTON FOUND');

    // Remove ALL event listeners by replacing the button
    const newBtn = submitBtn.cloneNode(true);
    submitBtn.parentNode.replaceChild(newBtn, submitBtn);

    // Add our handler
    newBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();

      console.log('💥 BUTTON CLICKED');

      // Get values directly from DOM
      const formInputs = form.querySelectorAll('input');
      const formSelects = form.querySelectorAll('select');
      const formTextareas = form.querySelectorAll('textarea');

      let name = '';
      let email = '';
      let pkg = '';
      let message = '';

      // Just grab values in order
      formInputs.forEach((input, i) => {
        const val = input.value.trim();
        console.log(`Input ${i}: type=${input.type}, value="${val}"`);
        if (input.type === 'text' && !name) name = val;
        if (input.type === 'email') email = val;
      });

      formSelects.forEach((select, i) => {
        const val = select.value;
        console.log(`Select ${i}: value="${val}"`);
        if (!pkg) pkg = val;
      });

      formTextareas.forEach((textarea, i) => {
        const val = textarea.value.trim();
        console.log(`Textarea ${i}: value="${val}"`);
        if (!message) message = val;
      });

      console.log('📦 COLLECTED DATA:', { name, email, pkg, message });

      // Check if we got the data
      if (!name || !email || !message) {
        console.log('❌ MISSING DATA - TRYING ALTERNATIVE METHOD');
        
        // Alternative: just get ALL values
        const allValues = Array.from(formInputs).map(i => i.value.trim()).filter(v => v);
        const textareaVal = formTextareas[0]?.value.trim();
        const selectVal = formSelects[0]?.value;
        
        console.log('All input values:', allValues);
        console.log('Textarea value:', textareaVal);
        console.log('Select value:', selectVal);
        
        // Assign by position if we have them
        if (allValues.length >= 2 && textareaVal) {
          name = allValues[0];
          email = allValues[1];
          pkg = selectVal || 'Not specified';
          message = textareaVal;
          console.log('✅ GOT DATA VIA ALTERNATIVE METHOD');
        } else {
          alert('Please fill in: Name, Email, and Message');
          return;
        }
      }

      console.log('🚀 SENDING EMAIL NOW');

      const data = {
        name: name,
        email: email,
        package: pkg || 'Not specified',
        message: message
      };

      // Send immediately
      if (window.sendEmailViaEmailJS) {
        window.sendEmailViaEmailJS(data)
          .then(() => {
            alert('✅ Message sent successfully!');
            console.log('✅ EMAIL SENT');
            // Clear inputs
            formInputs.forEach(i => i.value = '');
            formTextareas.forEach(t => t.value = '');
            if (formSelects[0]) formSelects[0].selectedIndex = 0;
          })
          .catch(err => {
            alert('❌ Failed to send. Check console.');
            console.error('SEND ERROR:', err);
          });
      } else {
        // EmailJS not ready, send directly
        console.log('⚠️ EmailJS not ready, importing now...');
        import('https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js')
          .then(emailjs => {
            emailjs.default.init('b4FULBMJBZFW3n5D6');
            return emailjs.default.send('service_jtdigei', 'template_4xvvhf8', {
              user_name: data.name,
              user_email: data.email,
              package: data.package,
              user_message: data.message,
              to_email: 'support@techpimp.site'
            });
          })
          .then(() => {
            alert('✅ Message sent successfully!');
            formInputs.forEach(i => i.value = '');
            formTextareas.forEach(t => t.value = '');
          })
          .catch(err => {
            alert('❌ Failed to send: ' + err.message);
            console.error(err);
          });
      }
    };

    console.log('✅ NUCLEAR FIX ARMED');
  }, 500);
})();
