/**
 * AGGRESSIVE CONTACT FORM FIX
 */

(function() {
  console.log('🚀 STARTING FORM FIX');

  function fixContactForm() {
    const form = document.querySelector('form');
    if (!form) {
      setTimeout(fixContactForm, 100);
      return;
    }

    if (form.dataset.fixed) return;
    form.dataset.fixed = 'true';

    console.log('✅ FORM FOUND');

    const handleSubmit = function(e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      console.log('🔥 FORM SUBMIT INTERCEPTED');

      // Get ALL inputs
      const allInputs = Array.from(form.querySelectorAll('input'));
      const allSelects = Array.from(form.querySelectorAll('select'));
      const allTextareas = Array.from(form.querySelectorAll('textarea'));

      console.log('Found inputs:', allInputs.length);
      console.log('Found selects:', allSelects.length);
      console.log('Found textareas:', allTextareas.length);

      // Get values by position
      let nameValue = '';
      let emailValue = '';
      let packageValue = '';
      let messageValue = '';

      // Get name (first text input)
      for (let input of allInputs) {
        if (input.type === 'text' && input.value.trim()) {
          nameValue = input.value.trim();
          console.log('✅ Found name:', nameValue);
          break;
        }
      }

      // Get email
      for (let input of allInputs) {
        if (input.type === 'email' && input.value.trim()) {
          emailValue = input.value.trim();
          console.log('✅ Found email:', emailValue);
          break;
        }
      }

      // Get package (first select)
      if (allSelects.length > 0 && allSelects[0].value) {
        packageValue = allSelects[0].value;
        console.log('✅ Found package:', packageValue);
      }

      // Get message (first textarea)
      if (allTextareas.length > 0 && allTextareas[0].value.trim()) {
        messageValue = allTextareas[0].value.trim();
        console.log('✅ Found message:', messageValue);
      }

      // Log everything we found
      console.log('📋 ALL VALUES:', {
        name: nameValue,
        email: emailValue,
        package: packageValue,
        message: messageValue
      });

      // Simple validation
      if (!nameValue || !emailValue || !messageValue) {
        console.log('❌ VALIDATION FAILED');
        if (!nameValue) console.log('Missing: name');
        if (!emailValue) console.log('Missing: email');
        if (!messageValue) console.log('Missing: message');
        alert('Please fill in all fields');
        return false;
      }

      console.log('✅ VALIDATION PASSED - SENDING EMAIL');

      const formData = {
        name: nameValue,
        email: emailValue,
        package: packageValue || 'Not specified',
        message: messageValue
      };

      // Send via EmailJS
      if (window.sendEmailViaEmailJS) {
        window.sendEmailViaEmailJS(formData)
          .then(() => {
            console.log('✅ EMAIL SENT!');
            alert('Message sent successfully!');
            // Clear form
            allInputs.forEach(input => input.value = '');
            allSelects.forEach(select => select.selectedIndex = 0);
            allTextareas.forEach(textarea => textarea.value = '');
          })
          .catch((err) => {
            console.error('❌ SEND FAILED:', err);
            alert('Failed to send. Please try again.');
          });
      } else {
        console.error('❌ EMAILJS NOT READY');
        alert('Email system not ready. Please wait a moment and try again.');
      }

      return false;
    };

    // Clone form to remove all React handlers
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    // Add handlers to EVERYTHING
    newForm.addEventListener('submit', handleSubmit, true);
    
    const buttons = newForm.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit(e);
      }, true);
    });

    console.log('✅ FORM INTERCEPTED - READY TO GO');
  }

  // Run multiple times to catch the form
  setTimeout(fixContactForm, 100);
  setTimeout(fixContactForm, 500);
  setTimeout(fixContactForm, 1000);
  setTimeout(fixContactForm, 2000);

  // Watch for route changes
  setInterval(() => {
    if (window.location.pathname === '/contact') {
      fixContactForm();
    }
  }, 500);
})();
