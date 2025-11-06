/**
 * SELF-CONTAINED FIX WITH EMAILJS BUILT IN
 */

(function() {
  console.log('🔥 LOADING EMAILJS DIRECTLY');

  // Load EmailJS library
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
  script.onload = function() {
    emailjs.init("b4FULBMJBZFW3n5D6");
    console.log('✅ EMAILJS LOADED AND READY');
  };
  document.head.appendChild(script);

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

      console.log('🚀 SENDING EMAIL NOW');

      // Get current time
      const now = new Date();
      const time = now.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });

      // Add package info to message if selected
      let fullMessage = message;
      if (pkg && pkg !== 'Select Your Package') {
        fullMessage = `Package Selected: ${pkg}\n\n${message}`;
      }

      // Send with YOUR template variables
      if (typeof emailjs !== 'undefined') {
        emailjs.send("service_jtdigei", "template_4xvvhf8", {
          name: name,
          email: email,
          time: time,
          message: fullMessage
        })
        .then(() => {
          alert('✅ Message sent successfully!');
          console.log('✅ EMAIL SENT!');
          
          // Show success popup
          const popup = document.createElement('div');
          popup.style.cssText = 'position:fixed;bottom:30px;right:30px;background:#22c55e;color:white;padding:20px;border-radius:8px;z-index:9999;font-weight:bold;box-shadow:0 4px 6px rgba(0,0,0,0.3);';
          popup.textContent = '✅ Message sent successfully!';
          document.body.appendChild(popup);
          setTimeout(() => popup.remove(), 3000);
          
          // Clear form
          formInputs.forEach(i => i.value = '');
          formTextareas.forEach(t => t.value = '');
          if (formSelects[0]) formSelects[0].selectedIndex = 0;
        })
        .catch(err => {
          alert('❌ Failed to send. Error: ' + err.text);
          console.error('SEND ERROR:', err);
        });
      } else {
        alert('⏳ Email system still loading. Please wait 2 seconds and try again.');
        console.error('EmailJS not loaded yet');
      }
    };

    console.log('✅ FIX ARMED AND READY');
  }, 500);
})();
