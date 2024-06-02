import React, { FC } from "react";
import "./Snackbar.css";

interface SnackbarProps {
  message: string;
  success: boolean;
  handleClose: () => void;
}

export const Snackbar: FC<SnackbarProps> = ({
  message,
  success,
  handleClose,
}) => {
  return (
    <div className={`snackbar-container ${success ? "success" : "fail"}`}>
      <p className="snackbar-message">{message}</p>
      <p className="snackbar-close" onClick={handleClose}>
        ×
      </p>
    </div>
  );
};
