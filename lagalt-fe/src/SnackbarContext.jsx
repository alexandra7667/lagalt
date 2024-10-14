import { createContext, useState, useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarContext = createContext();

//When you wrap your App component with the SnackbarProvider, all the nested components inside App will be passed as children to the SnackbarProvider
export const SnackbarProvider = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const openSnackbar = (message, severity) => {
    setSnackbarState({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbarState.severity}
          variant="filled"
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
