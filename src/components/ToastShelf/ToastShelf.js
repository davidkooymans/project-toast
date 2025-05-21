import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

import { ToastContext } from "../ToastProvider/ToastProvider";

function ToastShelf() {
  const toasts = React.useContext(ToastContext).toasts
  const removeToast = React.useContext(ToastContext).removeToast

  return (
    <ol className={styles.wrapper}>
      {toasts.map((toast) => {
        return (
          <li className={styles.toastWrapper} key={toast.id}>
            <Toast
              message={toast.message}
              type={toast.type}
              dismissHandler={() => {
                removeToast(toast);
              }}
            ></Toast>
          </li>
        );
      })}
    </ol>
  );
}

export default ToastShelf;
