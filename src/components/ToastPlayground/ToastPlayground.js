import React from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf";
import { ToastContext } from "../ToastProvider/ToastProvider";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [toastType, setToastType] = React.useState(VARIANT_OPTIONS[0]);

  const addToast = React.useContext(ToastContext).addToast;

  const textAreaRef = React.useRef();

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf></ToastShelf>
      <div className={styles.controlsWrapper}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addToast(toastType, message);
            setMessage("");
            setToastType("notice");
            textAreaRef.current.focus();
          }}
        >
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: "baseline" }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id="message"
                value={message}
                className={styles.messageInput}
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
                ref={textAreaRef}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              {VARIANT_OPTIONS.map((item) => {
                const id = `variant-${item}`;
                return (
                  <label htmlFor={id} key={item}>
                    <input
                      id={id}
                      type="radio"
                      name="variant"
                      value={item}
                      checked={toastType === item}
                      onChange={(event) => setToastType(event.target.value)}
                    />
                    {item}
                  </label>
                );
              })}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button>Pop Toast!</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ToastPlayground;
