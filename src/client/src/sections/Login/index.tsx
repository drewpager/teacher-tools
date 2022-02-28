import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, CircularProgress, Alert, Snackbar } from '@mui/material';
import { Viewer } from '../../lib/types';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { AUTH_URL } from '../../lib/graphql/queries/AuthUrl/index';
import { AuthUrl as AuthUrlData } from '../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl';
import { LOG_IN } from '../../lib/graphql/mutations/LogIn/index';
import { LogIn as LogInData, LogInVariables } from '../../lib/graphql/mutations/LogIn/__generated__/LogIn';

interface Props {
  setViewer: (viewer: Viewer) => void;
}

export const Login = ({ setViewer }: Props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(true);
  const client = useApolloClient();
  const [logIn, { 
    data: LogInData, 
    loading: LogInLoading, 
    error: LogInError 
  }]  = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: data => {
      if (data && data.logIn) {
        setViewer(data.logIn);
        setOpen(true);
      } 
    },
    onError: error => {
      if (error) {
        setError(true);
      }
    }
  });
  const logInRef = useRef(logIn);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      logInRef.current({
        variables: {
          input: { code }
        }
      });
    }
  }, []);

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: AUTH_URL
      });
      window.location.href = data.authUrl;
      
    } catch {
      setError(true)
    }
  }

  const handleClose = () => {
    setOpen(false);
  }

  if (LogInLoading) {
    return (
      <Box sx={{ minWidth: 275, width: 500, height: 500, margin: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Card>
          <CircularProgress color="primary" />
        </Card>
      </Box>
    )
  }

  const LogInCard = (
    <Box sx={{ minWidth: 275, width: 500, height: 500, margin: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card>
        <CardContent>
          <Typography variant="h4" color="text.secondary">Login to Teacher Tools</Typography>
          <CardActions>
            <Button onClick={handleAuthorize} size="small" sx={{ p:2, border: '1px solid grey' }}>Sign In With Google!</Button>
          </CardActions>
          <Typography sx={{ fontStyle: 'italic' }}>Note: By signing in, you'll be redirected to the Google consent form to sign in
                with your Google account.</Typography>
        </CardContent>
      </Card>
    </Box>
  )

  if (open) {
    return (
      <Box>
        {LogInCard}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Logged In Successfully!
          </Alert>
        </Snackbar>
      </Box>
    )
  }

  if (LogInError) {
    return (
      <Box>
        {LogInCard}
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Error Logging In!
          </Alert>
        </Snackbar>
      </Box>
    )
  }

  return (
    <Box sx={{ minWidth: 275, width: 500, height: 500, margin: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card>
        <CardContent>
          <Typography variant="h4" color="text.secondary">Login to Teacher Tools</Typography>
          <CardActions>
            <Button onClick={handleAuthorize} size="small" sx={{ p:2, border: '1px solid grey' }}>Sign In With Google!</Button>
          </CardActions>
          <Typography sx={{ fontStyle: 'italic' }}>Note: By signing in, you'll be redirected to the Google consent form to sign in
                with your Google account.</Typography>
        </CardContent>
      </Card>
    </Box>
  )
}