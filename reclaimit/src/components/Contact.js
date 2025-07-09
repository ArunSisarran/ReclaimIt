import Header from './Header';
import './Contact.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function Contact() {
  const location = useLocation();
  const finderEmail = location.state?.finderEmail || '';

  useEffect(() => {
    window.emailjs.init("WuFZcdSLARs6o8iXX");
  }, []);

  function sendEmail(event) {
    event.preventDefault();
    window.emailjs.sendForm("service_hw20uol", "template_9ysvnfe", "#contact-form")
      .then(() => {
        alert("Message sent successfully!");
        document.getElementById("contact-form").reset();
      }, (error) => {
        alert("Failed to send message:\n" + JSON.stringify(error));
      });
  }

  return (
    <div className="contact-page">
      <Header />
      <div className="contact-container">
        <h2>Contact Finder</h2>
        <form id="contact-form" onSubmit={sendEmail} className="contact-form">
          <label>Name:</label>
          <input type="text" name="user_name" required />

          <label>Your Email:</label>
          <input type="email" name="user_email" required />

          <label>Message:</label>
          <textarea name="message" rows="5" required />

          <label>Email of the finder:</label>
          <input
            type="email"
            name="finder_email"
            value={finderEmail}
            readOnly
            required
          />

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
