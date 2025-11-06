/**
 * SIMPLE CONTACT FORM FIX
 * This script overrides the React form's mailto behavior with EmailJS
 */

(function() {
  let formIntercepted = false;

  function fixContactForm() {
    // Only run once per page load
    if (formIntercepted && window.location.pathname === '/contact') {
      return;
    }

    const form = document.querySelector('form');
    if (!form) {
      setTimeout(fixContactForm, 200);
      return;
    }

    // Check if this is the contact form
    const inputs = form.querySelectorAll('input');
    const textarea = form.querySelector('textarea');
    const select = form.querySelector('select');

    if (inputs.length === 0 || !textarea || !select) {
      setTimeout(fixContactForm, 200);
      return;
    }

    console.log('✅ Contact form detected');

    // Prevent multiple interceptions
    if (form.dataset.intercepted) {
      return;
    }
    form.dataset.intercepted = 'true';
    formIntercepted = true;

    // Override all submit events
    const handleSubmit = function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      
      console.log('📧 Form submitted, using EmailJS...');

      // Get form values - more flexible selectors
      const nameInput = form.querySelector('input[name="name"]') || 
                        form.querySelector('input[placeholder*="Name"]') ||
                        form.querySelector('input[type="text"]');
      
      const emailInput = form.querySelector('input[name="email"]') || 
                         form.querySelector('input[type="email"]');
      
      const packageSelect = form.querySelector('select[name="package"]') || 
                           form.querySelector('select');
      
      const messageTextarea = form.querySelector('textarea[name="message"]') || 
                             form.querySelector('textarea');

      const formData = {
        name: nameInput?.value?.trim() || '',
        email: emailInput?.value?.trim() || '',
        package: packageSelect?.value?.trim() || 'Not specified',
        message: messageTextarea?.value?.trim() || ''
      };

      console.log('📋 Form data collected:', formData);

      // Validate
      if (!formData.name) {
        alert('Please enter your name.');
        console.log('❌ Validation failed: No name');
        return false;
      }
      
      if (!formData.email) {
        alert('Please enter your email.');
        console.log('❌ Validation failed: No email');
        return false;
      }
      
      if (!formData.message) {
        alert('Please enter a message.');
        console.log('❌ Validation failed: No message');
        return false;
      }

      console.log('✅ Validation passed, sending email...');

      // Send via EmailJS
      if (typeof window.sendEmailViaEmailJS === 'function') {
        window.sendEmailViaEmailJS(formData)
          .then(() => {
            console.log('✅ Email sent successfully!');
            // Reset form
            if (nameInput) nameInput.value = '';
            if (emailInput) emailInput.value = '';
            if (packageSelect) packageSelect.value = '';
            if (messageTextarea) messageTextarea.value = '';
          })
          .catch((error) => {
            console.error('❌ Email send failed:', error);
          });
      } else {
        console.error('❌ EmailJS not initialized. Waiting and retrying...');
        setTimeout(() => {
          if (typeof window.sendEmailViaEmailJS === 'function') {
            window.sendEmailViaEmailJS(formData)
              .then(() => {
                if (nameInput) nameInput.value = '';
                if (emailInput) emailInput.value = '';
                if (packageSelect) packageSelect.value = '';
                if (messageTextarea) messageTextarea.value = '';
              });
          }
        }, 1000);
      }

      return false;
    };

    // Remove all existing listeners by cloning the form
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    // Add our listener at the capture phase (runs first)
    newForm.addEventListener('submit', handleSubmit, true);
    
    // Also override the submit button click
    const submitButton = newForm.querySelector('button[type="submit"]') || 
                        newForm.querySelector('button');
    if (submitButton) {
      submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        handleSubmit(e);
      }, true);
    }

    console.log('✅ Form intercepted successfully');
    console.log('📋 Form elements found:', {
      inputs: newForm.querySelectorAll('input').length,
      select: !!newForm.querySelector('select'),
      textarea: !!newForm.querySelector('textarea'),
      button: !!submitButton
    });
  }

  // Initial check
  setTimeout(fixContactForm, 500);

  // Watch for route changes (React Router)
  let lastPath = window.location.pathname;
  setInterval(() => {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname;
      formIntercepted = false;
      if (lastPath === '/contact') {
        setTimeout(fixContactForm, 300);
      }
    }
  }, 500);

  // Also watch for DOM changes
  const observer = new MutationObserver(() => {
    if (window.location.pathname === '/contact' && !formIntercepted) {
      setTimeout(fixContactForm, 300);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log('🚀 Contact form interceptor loaded');
})();
