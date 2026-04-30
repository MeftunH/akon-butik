export default function QuestionModal() {
  return (
    <div
      className="modal modalCentered fade modal-ask_question"
      id="askQuestion"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-heading">
            <h2 className="fw-normal">Ask A Question</h2>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <form className="form-ask" onSubmit={(e) => e.preventDefault()}>
            <div className="form_content">
              <input type="text" placeholder="Name *" required />
              <input type="text" placeholder="Email *" required />
              <input type="text" placeholder="Phone number" />
              <textarea
                placeholder="Message"
                style={{ height: 180 }}
                defaultValue={""}
              />
            </div>
            <button type="submit" className="tf-btn animate-btn w-100">
              Subscribe
            </button>
          </form>
          <ul className="tf-social-icon justify-content-center">
            <li>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                className="social-facebook"
              >
                <span className="icon">
                  <i className="icon-fb" />
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                className="social-instagram"
              >
                <span className="icon">
                  <i className="icon-instagram-logo" />
                </span>
              </a>
            </li>
            <li>
              <a href="https://x.com/" target="_blank" className="social-x">
                <span className="icon">
                  <i className="icon-x" />
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                className="social-tiktok"
              >
                <span className="icon">
                  <i className="icon-tiktok" />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
