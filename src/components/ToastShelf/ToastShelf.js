import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf({toasts, setToasts}) {
  
  function removeToast(id) {
    const newToasts = toasts.filter(toast => toast.id != id)
    setToasts(newToasts)
  }

  return (
    <ol className={styles.wrapper}>
      {toasts.map((toast) => {
        return <li className={styles.toastWrapper} key={toast.id}>
          <Toast
            message={toast.message}
            type={toast.type}
            dismissHandler={() => {
              removeToast(toast.id);
            }}
          ></Toast>
        </li>;
      })}
    </ol>
  );
}

export default ToastShelf;
