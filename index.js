import emailjs from "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";

document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("b4FULBMJBZFW3n5D6"); // Public key

  const form = document.querySelector(".contact-form");
  if (!form) return;

  const popup = document.createElement("div");
  popup.className = "popup";
  document.body.appendChild(popup);

  function showPopup(message, type) {
    popup.textContent = message;
    popup.className = `popup show ${type}`;
    setTimeout(() => (popup.className = "popup"), 3000);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_jtdigei", "template_4xvvhf8", form)
      .then(() => {
        showPopup("✅ Message sent successfully!", "success");
        form.reset();
      })
      .catch(() => showPopup("❌ Failed to send message.", "error"));
  });
});
