import { createContext, useState, useContext } from 'react';
import ToastNotification from '../utils/ToastNotification'; // Import your Toast component

// Create a Context for Toast
const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

// ToastProvider to wrap the application and manage the toast notifications globally
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {/* Render ToastNotification globally */}
      <ToastNotification
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={hideToast}
      />
      {children}
    </ToastContext.Provider>
  );
};
