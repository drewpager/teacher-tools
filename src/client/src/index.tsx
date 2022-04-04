import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import { useMutation } from '@apollo/react-hooks';
import { LOG_IN } from '../src/lib/graphql/mutations/LogIn';
import {
  LogIn as LogInData,
  LogInVariables
} from '../src/lib/graphql/mutations/LogIn/__generated__/LogIn';

import { Home, Teach, Lesson, Lessons, NotFound, User, Terms, Privacy, Login, AppHeader } from './sections';
import { DisplayError } from './lib/utils';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Skeleton, CircularProgress, Box } from '@mui/material';
import theme from './theme';
import { Viewer } from './lib/types';

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasPayment: null,
  didRequest: false
}

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: data => {
      if (data && data.logIn) {
        setViewer(data.logIn);

        if (data.logIn.token) {
          sessionStorage.setItem("token", data.logIn.token);
        } else {
          sessionStorage.removeItem("token");
        }
      }
    } 
  });

  const logInRef = useRef(logIn);

  useEffect(() => {
    logInRef.current();
  }, [])

  if (!viewer.didRequest && !error) {
    return (
      <Box>
        <Skeleton variant="rectangular" animation="wave" width="100%" height="50px" />
        <Box sx={{ alignItems: "center", justifyContent: "center", position: "absolute"}}>
          <CircularProgress color="primary" />
        </Box>
      </Box>
    )
  }

  const LogInError = error ? (
    <DisplayError title="We weren't able to verify you were logged in. Please try again!" />
  ) : null;

  return (
    <Router>
      {LogInError}
      <AppHeader viewer={viewer} setViewer={setViewer} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teach" element={<Teach />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="/lessons/:filter?" element={<Lessons title="Teacher Tools" />} />
        <Route path="/user/:id" children={(props: any) => (<User {...props} viewer={viewer} />)} element={<User viewer={viewer} />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/login" children={(props: any) => (<Login {...props} setViewer={setViewer} />)} element={<Login setViewer={setViewer} />} />
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  )
}

const httpLink = createHttpLink({
  uri: '/api'
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem("token");
  return {
    headers: {
      "X-CSRF-TOKEN": token || ""
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <App />
      {/* <Lessons title="Teacher Tools" /> */}
    </ApolloProvider>
    <CssBaseline />
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
