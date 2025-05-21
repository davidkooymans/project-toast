import React from "react";

function useEscape() {
  const callbacks = {};

  function addCallback(name, method) {
    if (callbacks[name] !== undefined && callbacks[name] !== method) {
      console.log(`updating ${name}`);
    }
    callbacks[name] = method;
  }

  function removeCallback(name) {
    delete callbacks[name];
  }

  React.useEffect(() => {
    function escapeListener(event) {
      if (event.key === "Escape") {
        Object.values(callbacks).forEach(method => {
          method();
        });
      }
    }

    window.addEventListener("keydown", escapeListener);

    return () => {
      window.removeEventListener("keydown", escapeListener);
    };
  }, []);

  return [addCallback, removeCallback];
}

export default useEscape;
