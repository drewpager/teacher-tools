import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, CircularProgress, Alert, Snackbar, IconButton, Icon, Divider, TextField } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useApolloClient } from '@apollo/react-hooks';
import { AUTH_URL } from '../../graphql/queries/AuthUrl/index';
import { AuthUrl as AuthUrlData } from '../../graphql/queries/AuthUrl/__generated__/AuthUrl';
import { useLogInMutation, Viewer } from '../../../graphql/generated';
import { Link, Navigate } from 'react-router-dom';
import { DisplayError, DisplaySuccess } from '../../utils';
import './signupmodal.scss';
import { FAQ, Footer, SignUpForm } from '../';

interface Props {
  setViewer: (viewer: Viewer) => void;
}

export const SignupModal = ({ setViewer }: Props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const client = useApolloClient();
  const [logIn, {
    data: Mutation,
    loading: LogInLoading,
    error: LogInError
  }] = useLogInMutation({
    onCompleted: data => {
      if (data && data.logIn && data.logIn.token) {
        setViewer(data.logIn);
        sessionStorage.setItem("token", data.logIn.token);
        return (<DisplaySuccess title="You've successfully signed up!" />)
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

  if (Mutation && Mutation.logIn) {
    const { id: viewerId } = Mutation.logIn;
    return (
      <>
        <Navigate to={`/pricing/`} />
        <DisplaySuccess title="Signed up successfully!" />
      </>
    );
  }

  const handleClose = () => {
    setOpen(false);
  }

  if (LogInLoading) {
    return (
      <Box sx={{ margin: 50 }}>
        <CircularProgress color="primary" />
      </Box>
    )
  }

  const LogInCard = (
    <Box className="login--box">
      <Card className="login--card">
        <CardContent>
          <Typography variant="h4" className='login--text'>Sign Up For Plato's Peach</Typography>
          <CardActions>
            <Button className="login--button" onClick={handleAuthorize} size="small">Free Account With Google!</Button>
          </CardActions>
          <Typography sx={{ fontStyle: 'italic' }}>Note: By signing up, you'll be redirected to the Google consent form to sign in
            with your Google account.</Typography>
        </CardContent>
      </Card>
    </Box>
  )

  if (LogInError) {
    return (
      <Box>
        {LogInCard}
        <DisplayError title="Error Signing Up!" />
      </Box>
    )
  }

  if (document.location.href.indexOf("user") > -1) {
    return (
      <Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Signed Up Successfully!
          </Alert>
        </Snackbar>
      </Box>
    )
  }

  return (
    // <Box sx={{ minWidth: 275, width: 500, height: 500, margin: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Box className="login-modal--box">
      <Card className="login-modal--card">
        <CardContent>
          <Typography variant="h4" color="text.secondary">Sign Up For Plato's Peach</Typography>
          <Divider sx={{ margin: 2 }} />
          <CardActions>
            <Button className="google--button" onClick={handleAuthorize} size="medium"><GoogleIcon fontSize='medium' /> Sign Up With Google!</Button>
          </CardActions>
          <Typography sx={{ fontStyle: 'italic' }}>Note: By signing up, you'll be redirected to the Google consent form to sign in
            with your Google account.</Typography>
          <Divider sx={{ margin: 2 }} />
          <Typography sx={{ fontStyle: 'italic' }}>Or</Typography>
          <Typography variant="h5">Sign Up With Email</Typography>
          <SignUpForm />
          <Typography variant="h5">Returning User? <Link to="/login" style={{ color: "#000" }}>Login Here.</Link></Typography>
        </CardContent>
      </Card>
    </Box>
  )
}