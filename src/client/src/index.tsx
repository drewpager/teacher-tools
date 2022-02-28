import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

import { Home, Teach, Lesson, Lessons, NotFound, User, Terms, Privacy, Login } from './sections';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { Header } from './lib/components/layout/Header';
import { Viewer } from './lib/types';

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false
}

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teach" element={<Teach />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="/lessons/:filter?" element={<Lessons title="Teacher Tools" />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/login" children={(props: any) => (<Login {...props} setViewer={setViewer} />)} element={<Login setViewer={setViewer} />} />
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  )
}

const client = new ApolloClient({
  uri: 'http://localhost:9000/api',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <Header />
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
