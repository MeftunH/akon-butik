import { useEffect, useRef, useState } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function NewsLetterModal() {
  const [modalShown, setModalShown] = useState<boolean>(false);
  const { pathname } = useLocation();
  const modalElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (pathname === "/" && !modalShown) {
      let myModal: any = null;
      let timer: number | undefined;
      const el = document.getElementById("newsletterPopup");

      const showModal = async () => {
        if (!el) return;
        myModal = new bootstrap.Modal(el, { keyboard: false });

        // Show the modal after a delay
        await new Promise((resolve) => {
          timer = window.setTimeout(resolve, 2000);
        });
        myModal.show();

        const onHidden = () => {
          myModal?.hide();
        };

        modalElement.current?.addEventListener("hidden.bs.modal", onHidden);

        // cleanup for this listener when effect re-runs/unmounts
        return () => {
          modalElement.current?.removeEventListener(
            "hidden.bs.modal",
            onHidden
          );
        };
      };

      const cleanup = showModal();
      setModalShown(true);

      return () => {
        if (timer) window.clearTimeout(timer);
        cleanup?.then?.(() => void 0);
      };
    }
  }, [pathname, modalShown]);

  const [success, setSuccess] = useState<boolean>(true);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const handleShowMessage = () => {
    setShowMessage(true);
    window.setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "");

    try {
      const response = await axios.post(
        "https://express-brevomail.vercel.app/api/contacts",
        { email }
      );

      if ([200, 201].includes(response.status)) {
        form.reset();
        setSuccess(true);
        handleShowMessage();
      } else {
        setSuccess(false);
        handleShowMessage();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error:", error.response?.data || "An error occurred");
      } else {
        console.error("Error:", "An error occurred");
      }
      setSuccess(false);
      handleShowMessage();
      form.reset();
    }
  };

  return (
    <div
      ref={modalElement}
      className="modal modalCentered fade modal-newletter auto-popup"
      id="newsletterPopup"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-0">
          <div className="modal-heading">
            <div className="image">
              <img
                className="lazyload"
                src="/images/section/newletter.jpg"
                alt="Image"
                width={1044}
                height={666}
              />
            </div>
            <span className="icon-close-popup" data-bs-dismiss="modal">
              <i className="icon-close" />
            </span>
          </div>

          <div className="modal-body">
            <p className="h6 sub-title">Subscribe to our newletter!</p>
            <h3 className="fw-normal title">
              Receive 20% off your next order, along with exclusive offers and
              more!
            </h3>

            <form onSubmit={sendEmail} className="form-newletter">
              <fieldset className="mb-12">
                <input
                  className="style-stroke"
                  type="text"
                  placeholder="Enter your email"
                  required
                  name="email"
                />
              </fieldset>
              <button type="submit" className="tf-btn w-100 animate-btn">
                Subscribe
              </button>
            </form>

            <div
              className={`tfSubscribeMsg text-center footer-sub-element ${
                showMessage ? "active" : ""
              }`}
            >
              {success ? (
                <p style={{ color: "rgb(52, 168, 83)" }}>
                  You have successfully subscribed.
                </p>
              ) : (
                <p style={{ color: "red" }}>Something went wrong</p>
              )}
            </div>

            <ul className="tf-social-icon justify-content-center w-100">
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
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
                  rel="noreferrer"
                  className="social-instagram"
                >
                  <span className="icon">
                    <i className="icon-instagram-logo" />
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="social-x"
                >
                  <span className="icon">
                    <i className="icon-x" />
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/"
                  target="_blank"
                  rel="noreferrer"
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
    </div>
  );
}
