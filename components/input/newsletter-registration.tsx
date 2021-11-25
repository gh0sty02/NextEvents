import { FormEvent, useState, useRef, useContext } from "react";
import { NotificationContext } from "../../store/notification-context";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailRef = useRef<HTMLInputElement>(null);
  const notificationCtx = useContext(NotificationContext);
  function registrationHandler(event: FormEvent) {
    event.preventDefault();

    const enteredEmail = emailRef.current?.value;
    if (enteredEmail) {
      notificationCtx?.showNotification({
        title: "Signing up...",
        message: "Registering for newsletter",
        status: "pending",
      });

      fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: enteredEmail }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              throw new Error(data.message || "Something went wrong");
            });
          }
        })
        .then((data) => {
          notificationCtx?.showNotification({
            title: "Success",
            message: "Successfully registered for newsletter",
            status: "success",
          });
        })
        .catch((err) => {
          notificationCtx?.showNotification({
            title: "Error",
            message: err.message || "Something went wrong",
            status: "error",
          });
        });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            ref={emailRef}
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
