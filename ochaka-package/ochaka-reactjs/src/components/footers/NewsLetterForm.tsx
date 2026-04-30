import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface NewsLetterFormProps {
  isBgDark?: boolean;
}

export default function NewsLetterForm({
  isBgDark = false,
}: NewsLetterFormProps) {
  const [success, setSuccess] = useState<boolean>(true);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    const form = e.currentTarget;

    // Safely read the email field
    const formData = new FormData(form);
    const email = String(formData.get("email") || "");

    try {
      const response = await axios.post(
        "https://express-brevomail.vercel.app/api/contacts",
        { email }
      );

      if ([200, 201].includes(response.status)) {
        form.reset(); // Reset the form
        setSuccess(true); // Set success state
        handleShowMessage();
      } else {
        setSuccess(false);
        handleShowMessage();
      }
    } catch (error: unknown) {
      // Narrow error type safely
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
    <form
      className="form_sub has_check"
      id="subscribe-form"
      onSubmit={sendEmail}
    >
      <div className="f-content" id="subscribe-content">
        <fieldset className="col">
          <input
            className={isBgDark ? "style-stroke-2" : "style-stroke"}
            id="subscribe-email"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </fieldset>
        <button
          id="subscribe-button"
          type="submit"
          className={`tf-btn animate-btn type-small-2 ${
            isBgDark ? "btn-white animate-dark" : ""
          }`}
        >
          Subscribe
          <i className="icon icon-arrow-right" />
        </button>
      </div>

      <div className="checkbox-wrap">
        <input
          id="remember"
          type="checkbox"
          className={`tf-check style-3 ${isBgDark ? "style-white" : ""}`}
        />
        <label
          htmlFor="remember"
          className={`h6 ${isBgDark ? "text-main-5" : ""}`}
        >
          By clicking subcribe, you agree to the&nbsp;
          <Link
            to="/faq"
            className={`text-decoration-underline link ${
              isBgDark ? "text-main-5" : ""
            }`}
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to="/faq"
            className={`text-decoration-underline link ${
              isBgDark ? "text-main-5" : ""
            }`}
          >
            Privacy Policy
          </Link>
          .
        </label>
      </div>

      <div id="subscribe-msg">
        <div
          className={`tfSubscribeMsg footer-sub-element ${
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
      </div>
    </form>
  );
}
