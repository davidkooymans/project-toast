import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  React.useEffect(() => {
    function escapeListener(event) {
      if (event.key === 'Escape' ) {
        setToasts([])
      }
    }

    window.addEventListener("keydown", escapeListener);

    return () => {
      window.removeEventListener("keydown", escapeListener);
    };
  }, []);

  const [toasts, setToasts] = React.useState([]);

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
    const newToasts = toasts.filter((testToast) => toast.id != testToast.id);
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
