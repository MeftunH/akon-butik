export default function ShareModal() {
  return (
    <div className="modal modalCentered fade modal-share" id="shareWith">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-heading">
            <h2 className="fw-normal">Share</h2>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <ul className="tf-social-icon">
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
          <div className="wrap-code style-1">
            <p className="coppyText h6" id="coppyText">
              http://themesflat.com
            </p>
            <div className="btn-coppy-text tf-btn">Copy</div>
          </div>
        </div>
      </div>
    </div>
  );
}
