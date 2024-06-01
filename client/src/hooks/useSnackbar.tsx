import { useEffect, useState } from 'react';

const useSnackbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  const CLOSE_MILLISECONDS = 3000;
  let timer: ReturnType<typeof setTimeout>

  /**
   * Automatically close the snackbar after the given number of seconds
   */
  useEffect(() => {
    // For a smooth animation make sure that these are at least as long as
    // the number of milliseconds set in the css animation.
    if (isOpen) {
      timer = setTimeout(() => {
        close();
      }, CLOSE_MILLISECONDS);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  const close = () => {
    setMessage('');
    setIsOpen(false);
  };

  /**
   * Given a message to display and a boolean representing if the message
   * is a success message or an error message, display the snackbar with
   * the given message and the appropriate color.
   * 
   * @param {string} message - the message to display
   * @param {boolean} success - true if it's a success message, else false
   */
  const open = (message: string, success: boolean) => {
    setIsOpen(true);
    setMessage(message);
    setIsSuccess(success);
  };

  return { isOpen, message, isSuccess, open, close };
};

export default useSnackbar;