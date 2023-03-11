import React, { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

interface Props {
  title: string;
}

export function DisplaySuccess({ title }: Props) {
  const [success, setSuccess] = useState<boolean>(true);

  const handleClose = () => {
    setSuccess(false);
  }

  return (
    <>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {title}
        </Alert>
      </Snackbar>
    </>
  );
}