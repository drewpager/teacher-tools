import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, CircularProgress, Alert, Snackbar, IconButton, Icon, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useApolloClient } from '@apollo/react-hooks';
import { AUTH_URL } from '../../lib/graphql/queries/AuthUrl/index';
import { AuthUrl as AuthUrlData } from '../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl';
import { useLogInMutation, Viewer } from '../../graphql/generated';
import { Navigate } from 'react-router-dom';
import { DisplayError, DisplaySuccess } from '../../lib/utils';
import './login.scss';
import { Footer } from '../../lib/components';
import { Helmet } from 'react-helmet';
import { LogInForm } from '../../lib/components/LogInForm';
import { Link } from 'react-router-dom';

interface Props {
  setViewer: (viewer: Viewer) => void;
}

export const Login = ({ setViewer }: Props) => {
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
        return (<DisplaySuccess title="You've successfully logged in!" />)
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
        <Navigate to={`/user/${viewerId}`} />
        <DisplaySuccess title="Logged in successfully!" />
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
          <Typography variant="h4" className='login--text'>Login to Plato's Peach</Typography>
          <CardActions>
            <Button className="login--button" onClick={handleAuthorize} size="small">Sign In With Google!</Button>
          </CardActions>
          <Typography sx={{ fontStyle: 'italic' }}>Note: By signing in, you'll be redirected to the Google consent form to sign in
            with your Google account.</Typography>
        </CardContent>
      </Card>
    </Box>
  )

  if (LogInError) {
    return (
      <Box>
        {LogInCard}
        <DisplayError title="Error Logging In!" />
      </Box>
    )
  }

  if (document.location.href.indexOf("user") > -1) {
    return (
      <Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Logged In Successfully!
          </Alert>
        </Snackbar>
      </Box>
    )
  }

  return (
    // <Box sx={{ minWidth: 275, width: 500, height: 500, margin: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div>
      <Helmet>
        <title>{`Returning User Login | Plato's Peach`}</title>
        <meta name="description" content={`Login to leverage our catalog of short documentaries and custom assessments to create interactive lesson plans.`} />
      </Helmet>
      <Box className="login--box">
        <Card className="login--card">
          <CardContent>
            <Typography variant="h4" color="text.secondary">Login to Plato's Peach</Typography>
            <Divider sx={{ margin: 2 }} />
            <CardActions>
              <Button className="google--button" onClick={handleAuthorize} size="medium"><GoogleIcon fontSize='medium' /> Sign In With Google!</Button>
            </CardActions>
            <Typography sx={{ fontStyle: 'italic' }}>Note: By signing in, you'll be redirected to the Google consent form to sign in
              with your Google account.</Typography>
            <Divider sx={{ margin: 2 }} />
            <Typography sx={{ fontStyle: 'italic' }}>Or</Typography>
            <Typography variant="h5">Login With Email</Typography>
            <LogInForm />
            <Typography variant="h5">New User? <Link to="/signup" style={{ color: "#000" }}>Sign Up Here.</Link></Typography>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </div>
  )
}