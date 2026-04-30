export default function ContactForm() {
  return (
    <section className="s-contact-form flat-spacing">
      <div className="container">
        <div className="sect-title text-center">
          <p className="h1 title mb-8">Contact Form</p>
          <p className="s-subtitle h6">
            Contact us using the form below, we will contact you as soon as
            possible
          </p>
        </div>
        <form className="form-contact-2 " onSubmit={(e) => e.preventDefault()}>
          <div className="form-content">
            <div className="tf-grid-layout md-col-3">
              <fieldset>
                <input type="text" placeholder="Your name" required />
              </fieldset>
              <fieldset>
                <input type="number" placeholder="Your phone number" required />
              </fieldset>
              <fieldset>
                <input type="email" placeholder="Your email" required />
              </fieldset>
            </div>
            <textarea placeholder="Review" defaultValue={""} />
          </div>
          <div className="form-action">
            <button type="submit" className="h6 tf-btn animate-btn">
              Send message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
