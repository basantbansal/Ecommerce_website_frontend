import { useEffect } from "react";

function PopUp({ children, onClose, duration = 2500 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose,duration]);

  return (
    <div className="fixed top-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg z-50">
      {children}
    </div>
  );
}

export default PopUp;
