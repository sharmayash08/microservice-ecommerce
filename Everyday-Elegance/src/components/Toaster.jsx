// Toaster.js
import { useState, useEffect } from 'react';

export default function Toaster({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 ease-in-out">
      {message}
    </div>
  );
}
