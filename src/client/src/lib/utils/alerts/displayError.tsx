import React, { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

interface Props {
  title: string;
}

export function DisplayError({ title }: Props) {
  const [error, setError] = useState<boolean>(true);
  
  const handleClose = () => {
    setError(false);
  }

  return (
    <>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {title}
      </Alert>
      </Snackbar>
    </>
  );
}