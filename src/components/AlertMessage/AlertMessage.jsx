import React from 'react';
import './AlertMessage.css';

const AlertMessage = ({ message, onClose }) => {
  return (
    <div className="alert-message">
      <div className="alert-content">
        <span className="alert-text">{message}</span>
        <button className="alert-close" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default AlertMessage;
