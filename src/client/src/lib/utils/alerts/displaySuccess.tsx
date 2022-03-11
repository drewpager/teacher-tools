import React from 'react';
import { Snackbar, Alert } from '@mui/material';

export const displaySuccess = (title: string = "Success!") => {
  let open = true;
  
  const handleClose = () => {
    open = false;
  }

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {title} + "Success!"
        </Alert>
      </Snackbar>
    </>
  );
};