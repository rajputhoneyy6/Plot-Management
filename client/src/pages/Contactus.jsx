const ContactUs = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Contact Us</h1>

      <p>
        We’d love to hear from you! Whether you have questions about our services, need assistance with plot registration, 
        or want to provide feedback, our team is here to help.
      </p>

      <h4 className="mt-4">Our Contact Details</h4>
      <ul>
        <li><strong>Address:</strong> 123 Main Street, Gurugram , Haryana , 122002 </li>
        <li><strong>Email:</strong> support@yourcompany.com</li>
        <li><strong>Phone:</strong> +91 12345 67890</li>
        <li><strong>Working Hours:</strong> Monday – Friday: 9:00 AM – 6:00 PM</li>
      </ul>

      <h4 className="mt-4">Send Us a Message</h4>
      <p>
        You can also reach out to us directly using the form below. We aim to respond to all inquiries within 24 hours.
      </p>

      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" placeholder="Your full name" />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" placeholder="your.email@example.com" />
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea className="form-control" id="message" rows="5" placeholder="Write your message here..."></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Send Message</button>
      </form>

      <h4 className="mt-5">Connect With Us</h4>
      <p>
        Stay updated with our latest plots, news, and announcements. Follow us on social media:
      </p>
      <ul>
        <li>Facebook: facebook.com/yourcompany</li>
        <li>Twitter: twitter.com/yourcompany</li>
        <li>Instagram: instagram.com/yourcompany</li>
        <li>LinkedIn: linkedin.com/company/yourcompany</li>
      </ul>
    </div>
  );
};

export default ContactUs;
