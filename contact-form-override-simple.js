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
    const hasNameField = form.querySelector('input[placeholder*="Name"]');
    const hasEmailField = form.querySelector('input[type="email"]');
    const hasMessageField = form.querySelector('textarea');

    if (!hasNameField || !hasEmailField || !hasMessageField) {
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

      // Get form values
      const formData = {
        name: form.querySelector('input[placeholder*="Name"]')?.value || '',
        email: form.querySelector('input[type="email"]')?.value || '',
        package: form.querySelector('select')?.value || 'Not specified',
        message: form.querySelector('textarea')?.value || ''
      };

      // Validate
      if (!formData.name || !formData.email || !formData.message) {
        alert('Please fill in all required fields.');
        return false;
      }

      console.log('📋 Form data:', formData);

      // Send via EmailJS
      if (typeof window.sendEmailViaEmailJS === 'function') {
        window.sendEmailViaEmailJS(formData)
          .then(() => {
            console.log('✅ Email sent successfully!');
            form.reset();
          })
          .catch((error) => {
            console.error('❌ Email send failed:', error);
          });
      } else {
        console.error('❌ EmailJS not initialized. Waiting and retrying...');
        setTimeout(() => {
          if (typeof window.sendEmailViaEmailJS === 'function') {
            window.sendEmailViaEmailJS(formData);
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
    const submitButton = newForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        handleSubmit(e);
      }, true);
    }

    console.log('✅ Form intercepted successfully');
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
