import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Alert } from '@mui/material';
import { useMutation } from '@apollo/client';
import { REQUEST_PASSWORD_RESET } from '../../lib/graphql/mutations/LogIn';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [requestReset, { loading, error }] = useMutation(REQUEST_PASSWORD_RESET);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await requestReset({ variables: { email } });
    setSubmitted(true);
  };

  return (
    <Box className="login--box">
      <Card className="login--card">
        <CardContent>
          <Typography variant="h4">Forgot Password</Typography>
          {submitted ? (
            <Alert severity="success" sx={{ mt: 2 }}>If an account exists for that email, a reset link has been sent.</Alert>
          ) : (
            <form onSubmit={onSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
              />
              <Button variant="contained" type="submit" disabled={loading}>Send reset link</Button>
              {error && <Alert severity="error" sx={{ mt: 2 }}>Something went wrong. Please try again.</Alert>}
            </form>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}


