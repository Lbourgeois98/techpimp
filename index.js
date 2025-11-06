import emailjs from "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";

emailjs.init("b4FULBMJBZFW3n5D6");

const popup = document.createElement("div");
popup.className = "popup";
document.body.appendChild(popup);

function showPopup(message, type) {
  popup.textContent = message;
  popup.className = `popup show ${type}`;
  setTimeout(() => (popup.className = "popup"), 3000);
}

function setupFormHandler() {
  const forms = document.querySelectorAll("form");

  forms.forEach(form => {
    const nameInput = form.querySelector("input[name='name'], input[name='user_name'], input[placeholder*='Name' i]");
    const emailInput = form.querySelector("input[name='email'], input[name='user_email'], input[type='email']");
    const messageInput = form.querySelector("textarea[name='message'], textarea[name='user_message'], textarea");

    if (nameInput && emailInput && messageInput && !form.dataset.emailjsSetup) {
      form.dataset.emailjsSetup = "true";
      form.removeAttribute("action");

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const templateData = {
          user_name: nameInput.value,
          user_email: emailInput.value,
          user_message: messageInput.value,
          to_email: "your-email@example.com"
        };

        emailjs.send("service_jtdigei", "template_4xvvhf8", templateData)
          .then(() => {
            showPopup("Message sent successfully!", "success");
            form.reset();
          })
          .catch(err => {
            console.error("EmailJS Error:", err);
            showPopup("Failed to send message. Please try again.", "error");
          });
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", setupFormHandler);

const observer = new MutationObserver(() => {
  setTimeout(setupFormHandler, 100);
});

observer.observe(document.body, { childList: true, subtree: true });
