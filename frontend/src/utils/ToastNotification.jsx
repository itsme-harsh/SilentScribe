import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Icons as components instead of string templates
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
  </svg>
);

const RightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
  </svg>
);

const ToastNotification = ({ message, type, show, onClose }) => {
  const toastRef = useRef(null);

  useEffect(() => {
    if (show) {
      // GSAP animation for "coming from the top"
      gsap.fromTo(
        toastRef.current,
        {
          y: 0, // Start 400px above the screen
          opacity: 0, // Start invisible
        },
        {
          duration: 0.3,
          y: 100, // Move to normal position
          opacity: 1, // Make it visible
          ease: 'ease.out', // Smooth easing
        }
      );

      // Automatically close the toast after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  // Get the correct class and icon for the notification type
  const getNotificationClass = (type) => {
    switch (type) {
      case 'success':
        return { class: 'bg-blue-500 text-white', icon: <RightIcon /> };
      case 'error':
        return { class: 'bg-red-500 text-white', icon: <CloseIcon /> };
      case 'info':
        return { class: 'bg-blue-500 text-white', icon: null };
      default:
        return { class: 'bg-gray-500 text-white', icon: null };
    }
  };

  const notificationClass = getNotificationClass(type);

  return (
    <div className='justify-center flex'>
    <span
      ref={toastRef}
      className={`fixed z-100 flex  -top-20  p-4 rounded-lg shadow-lg transition-all duration-300 ${notificationClass.class} opacity-100`}
    >
      {/* Render the icon and message */}
      {notificationClass.icon}
      &nbsp;
      {message}
    </span>
    </div>
  );
};

export default ToastNotification;
