/**
 * WORKING FIX
 */

(function() {
  console.log('🔥 FORM FIX LOADED');

  setInterval(function() {
    if (window.location.pathname !== '/contact') return;

    const form = document.querySelector('form');
    if (!form || form.dataset.fixed) return;

    console.log('💣 FIXING FORM');
    form.dataset.fixed = 'true';

    const submitBtn = Array.from(form.querySelectorAll('button')).find(el => 
      el.textContent.includes('Start') || el.textContent.includes('Project') || el.type === 'submit'
    );

    if (!submitBtn) return;

    console.log('✅ SUBMIT BUTTON FOUND');

    const newBtn = submitBtn.cloneNode(true);
    submitBtn.parentNode.replaceChild(newBtn, submitBtn);

    newBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();

      console.log('💥 BUTTON CLICKED');

      const formInputs = form.querySelectorAll('input');
      const formSelects = form.querySelectorAll('select');
      const formTextareas = form.querySelectorAll('textarea');

      let name = '';
      let email = '';
      let pkg = '';
      let message = '';

      formInputs.forEach((input) => {
        const val = input.value.trim();
        if (input.type === 'text' && !name) name = val;
        if (input.type === 'email') email = val;
      });

      if (formSelects[0]) pkg = formSelects[0].value;
      if (formTextareas[0]) message = formTextareas[0].value.trim();

      console.log('📦 DATA:', { name, email, pkg, message });

      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }

      console.log('🚀 SENDING EMAIL');

      const data = {
        name: name,
        email: email,
        package: pkg || 'Not specified',
        message: message
      };

      // Wait for EmailJS to be ready
      function attemptSend(retries = 0) {
        if (window.sendEmailViaEmailJS) {
          window.sendEmailViaEmailJS(data)
            .then(() => {
              alert('✅ Message sent successfully!');
              console.log('✅ EMAIL SENT');
              formInputs.forEach(i => i.value = '');
              formTextareas.forEach(t => t.value = '');
              if (formSelects[0]) formSelects[0].selectedIndex = 0;
            })
            .catch(err => {
              alert('❌ Failed to send. Please try again.');
              console.error('SEND ERROR:', err);
            });
        } else if (retries < 10) {
          console.log('⏳ Waiting for EmailJS... retry', retries);
          setTimeout(() => attemptSend(retries + 1), 500);
        } else {
          alert('❌ Email system not ready. Please refresh and try again.');
          console.error('EmailJS never loaded');
        }
      }

      attemptSend();
    };

    console.log('✅ FIX ARMED');
  }, 500);
})();
