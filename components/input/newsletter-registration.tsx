import { FormEvent, useState, useRef } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailRef = useRef<HTMLInputElement>(null);
  function registrationHandler(event: FormEvent) {
    event.preventDefault();

    const enteredEmail = emailRef.current?.value;
    if (enteredEmail) {
      fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: enteredEmail }),
      })
        .then((res) => res.json)
        .then((data) => console.log(data));
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
