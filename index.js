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

// Expose global function for React to use
window.sendEmailViaEmailJS = function(formData) {
  return new Promise((resolve, reject) => {
    const templateData = {
      user_name: formData.name || "Not provided",
      user_email: formData.email || "Not provided",
      user_message: formData.message || "",
      package: formData.package || "Not specified",
      to_email: "support@techpimp.site"
    };

    emailjs.send("service_jtdigei", "template_4xvvhf8", templateData)
      .then((response) => {
        showPopup("Message sent successfully!", "success");
        resolve(response);
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        showPopup("Failed to send message. Please try again.", "error");
        reject(err);
      });
  });
};

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

      form.onsubmit = function(e) {
        e.preventDefault();
        e.stopPropagation();

        const formData = {
          name: nameInput?.value || "Not provided",
          email: emailInput?.value || "Not provided",
          package: packageSelect?.value || "Not specified",
          message: messageInput?.value || ""
        };

        if (!formData.email || !formData.message) {
          showPopup("Please fill in all required fields.", "error");
          return false;
        }

        window.sendEmailViaEmailJS(formData)
          .then(() => {
            form.reset();
          })
          .catch(() => {
            // Error already handled by showPopup
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
