import emailjs from '@emailjs/browser';

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

console.log('✅ EmailJS initialized and ready');
