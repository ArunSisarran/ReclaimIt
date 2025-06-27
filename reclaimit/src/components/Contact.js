import Header from './Header';
import './Contact.css';

function Contact() {
  window.onload = function(){
    window.emailjs.init("WuFZcdSLARs6o8iXX");   
  };

  function sendEmail(event){
    event.preventDefault();
    window.emailjs.sendForm("service_hw20uol", "template_9ysvnfe", "#contact-form")
      .then(function(){
        alert("Message sent successfully!");  
        document.getElementById("contact-form").reset();
      }, function (error){
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
          <input
            type="text"
            name="user_name"
            required
          />

          <label>Your Email:</label>
          <input
            type="email"
            name="user_email"
            required
          />

          <label>Message:</label>
          <textarea
            name="message"
            rows="5"
            required
          />

          <label>Email of the finder:</label>
          <input
            type="email"
            name="finder_email"
            required
          />

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;