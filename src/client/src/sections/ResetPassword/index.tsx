import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Alert } from '@mui/material';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../../lib/graphql/mutations/LogIn';

export const ResetPassword = () => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);
  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD);

  useEffect(() => {
    const t = new URL(window.location.href).searchParams.get('token') || '';
    setToken(t);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8 || password !== confirm) return;
    await resetPassword({ variables: { token, password } });
    setDone(true);
  };

  return (
    <Box className="login--box">
      <Card className="login--card">
        <CardContent>
          <Typography variant="h4">Reset Password</Typography>
          {done ? (
            <Alert severity="success" sx={{ mt: 2 }}>Password updated. You can now log in.</Alert>
          ) : (
            <form onSubmit={onSubmit}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                margin="normal"
                required
                error={confirm.length > 0 && confirm !== password}
                helperText={confirm.length > 0 && confirm !== password ? 'Passwords do not match' : ''}
              />
              <Button variant="contained" type="submit" disabled={loading || password.length < 8 || confirm !== password}>Update password</Button>
              {error && <Alert severity="error" sx={{ mt: 2 }}>Reset failed. The link may be invalid or expired.</Alert>}
            </form>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}


