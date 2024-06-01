import React from 'react';

interface SnackbarProps {
  message: string;
  handleClose: () => void;
  success: boolean;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, handleClose, success }) => {
  return (
    <div className={`snackbar-container ${success ? 'success' : 'fail'}`}>
      <p className="snackbar-message">{message}</p>
      <p className="snackbar-close" onClick={handleClose}>
        ×
      </p>
    </div>
  );
};

export default Snackbar;