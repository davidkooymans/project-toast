import React from "react";

import useEscape from "../../hooks/EscapeHook";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const clearToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  const [addEscapeListener] = useEscape();

  addEscapeListener("clearToasts", ()=>{clearToasts()});

  function addToast(toastType, message) {
    const newToasts = [...toasts];
    const toast = {
      id: crypto.randomUUID(),
      type: toastType,
      message: message,
    };
    newToasts.push(toast);
    setToasts(newToasts);
  }

  function removeToast(toast) {
    const newToasts = toasts.filter((testToast) => toast.id !== testToast.id);
    setToasts(newToasts);
  }

  return (
    <ToastContext.Provider
      value={{ toasts: toasts, addToast: addToast, removeToast: removeToast }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
