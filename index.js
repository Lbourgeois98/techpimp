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
    if (form.dataset.emailjsSetup) return;

    const inputs = form.querySelectorAll("input, textarea, select");
    const nameInput = form.querySelector("input[placeholder*='Name' i], input[type='text']:first-of-type");
    const emailInput = form.querySelector("input[type='email']");
    const packageSelect = form.querySelector("select");
    const messageInput = form.querySelector("textarea");

    if ((nameInput || emailInput) && messageInput && inputs.length >= 3) {
      form.dataset.emailjsSetup = "true";

      const originalSubmit = form.onsubmit;

      form.onsubmit = function(e) {
        e.preventDefault();
        e.stopPropagation();

        const name = nameInput?.value || "Not provided";
        const email = emailInput?.value || "Not provided";
        const packageVal = packageSelect?.value || "Not specified";
        const message = messageInput?.value || "";

        if (!email || !message) {
          showPopup("Please fill in all required fields.", "error");
          return false;
        }

        const templateData = {
          user_name: name,
          user_email: email,
          user_message: message,
          package: packageVal,
          to_email: "support@techpimp.site"
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

        return false;
      };

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();
        form.onsubmit(e);
      }, true);
    }
  });
}

setTimeout(setupFormHandler, 500);
document.addEventListener("DOMContentLoaded", setupFormHandler);

const observer = new MutationObserver(setupFormHandler);
observer.observe(document.body, { childList: true, subtree: true });
