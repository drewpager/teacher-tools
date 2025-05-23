import React, { useState, useEffect, useRef } from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
  Operation,
  NextLink,
  from
} from '@apollo/client';
import omitDeep from 'omit-deep-lodash';

import { setContext } from '@apollo/client/link/context';
import {
  Home,
  Dashboard,
  Lesson,
  Lessons,
  NotFound,
  User,
  Terms,
  Privacy,
  Pricing,
  Login,
  AppHeader,
  Playlist,
  PlaylistsCatalog,
  CreatePlaylist,
  CreateLesson,
  CreateQuiz,
  CreateArticle,
  EditPlaylist,
  Catalog,
  Contact,
  Quiz,
  TestElement,
  Donate,
  SignUp,
  Article,
  Plans,
  ArticlesCatalog,
  BlogHub,
  BlogPost,
  BlogCategory
} from './sections';
import { HomeInfoSkeleton } from './lib/components';
import { DisplayError } from './lib/utils';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import "@fontsource/noto-serif/";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Skeleton, CircularProgress, Box } from '@mui/material';
import theme from './theme';
// import { Viewer } from './lib/types';
import { Viewer, useLogInMutation } from './graphql/generated';
import { ScrollToTop } from './lib/utils/scrollToTop';
var webFont = require("webfontloader");

webFont.load({
  google: {
    families: ['Source Serif Pro', 'Source Sans Pro']
  }
})


const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  paymentId: null,
  contact: null,
  didRequest: false
}

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  const [logIn, { error }] = useLogInMutation({
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
      <Box sx={{ backgroundColor: "#FAF9F6" }}>
        <Skeleton variant="rectangular" animation="wave" width="100%" height="84px" />
        <br />
        <HomeInfoSkeleton />
      </Box>
    )
  }

  const LogInError = error ? (
    <DisplayError title="We weren't able to verify you were logged in. Please try again!" />
  ) : null;

  return (
    <Router>
      <ScrollToTop />
      {LogInError}
      <AppHeader viewer={viewer} setViewer={setViewer} />
      <main className='mainPanel'>
        <Routes>
          <Route path="/" element={<Home viewer={viewer} />} />
          <Route path="/dash" element={<Dashboard viewer={viewer} />} />
          <Route path="/test" element={<TestElement viewer={viewer} />} />
          {/* <Route path="/stripe" children={(props: any) => (<Stripe {...props} setViewer={setViewer} />)} element={<Stripe viewer={viewer} setViewer={setViewer} />} /> */}
          <Route path="/catalog" element={<Catalog viewer={viewer} />} />
          <Route path="/lesson/:id" element={<Lesson viewer={viewer} />} />
          <Route path="/lessons/:filter?" element={<Lessons title="Plato's Peach" />} />
          {/* <Route path="/user/:id" children={(props: any) => (<User {...props} viewer={viewer} />)} element={<User viewer={viewer} />} /> */}
          <Route path="/user/:id" element={<User viewer={viewer} />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/pricing" element={<Pricing viewer={viewer} setViewer={setViewer} />} />
          <Route path="/donate" element={<Donate viewer={viewer} setViewer={setViewer} />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/login" children={(props: any) => (<Login {...props} setViewer={setViewer} />)} element={<Login setViewer={setViewer} />} />
          <Route path="/signup" children={(props: any) => (<SignUp {...props} setViewer={setViewer} />)} element={<SignUp setViewer={setViewer} />} /> */}
          <Route path="/login" element={<Login setViewer={setViewer} />} />
          <Route path="/signup" element={<SignUp setViewer={setViewer} />} />
          <Route path="/playlist/:id" element={<Playlist viewer={viewer} />} />
          <Route path="/plans/:plan" element={<Plans viewer={viewer} setViewer={setViewer} />} />
          <Route path="/playlist/create" element={<CreatePlaylist viewer={viewer} />} />
          <Route path="/plans" element={<PlaylistsCatalog viewer={viewer} />} />
          <Route path="/plan/:grade" element={<PlaylistsCatalog viewer={viewer} />} />
          <Route path="/plan/:grade/:category" element={<PlaylistsCatalog viewer={viewer} />} />
          <Route path="/plan/:category" element={<PlaylistsCatalog viewer={viewer} />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/quiz/create" element={<CreateQuiz viewer={viewer} />} />
          <Route path="/article/create" element={<CreateArticle viewer={viewer} />} />
          <Route path="/article/:id" element={<Article viewer={viewer} />} />
          <Route path="/article" element={<ArticlesCatalog viewer={viewer} />} />
          <Route path="/edit/:id" element={<EditPlaylist viewer={viewer} />} />
          {/* <Route path="/lesson/create" children={(props: any) => (<CreateLesson {...props} viewer={viewer} />)} element={<CreateLesson viewer={viewer} />} /> */}
          <Route path="/lesson/create" element={<CreateLesson viewer={viewer} />} />
          <Route path="/blog" element={<BlogHub />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/category/:category" element={<BlogCategory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  )
}

type OperationTypeNode = 'query' | 'mutation' | 'subscription';

const removeTypenameFromMutation = (operation: Operation, forward: NextLink) => {
  const definition = operation?.query?.definitions.filter((def) => def.kind === 'OperationDefinition')?.[0];
  const mutation: OperationTypeNode = 'mutation';
  if (definition?.kind === 'OperationDefinition' && definition?.operation === mutation) {
    operation.variables = omitDeep(operation.variables, '__typename');
    return forward(operation);
  }
  return forward(operation);
};


const removeTypenameFromMutationLink = new ApolloLink(removeTypenameFromMutation);

export {
  removeTypenameFromMutationLink,
  removeTypenameFromMutation
};

const httpLink = createHttpLink({
  uri: '/api',
});

const blogLink = createHttpLink({
  uri: `${process.env.REACT_APP_STRAPI_URL}` || 'http://localhost:1337',
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem("token");
  return {
    headers: {
      ...headers,
      "X-CSRF-TOKEN": token || ""
    }
  }
})

const blogAuthLink = setContext((_, { headers }) => {
  const key = `${process.env.REACT_APP_STRAPI}`;
  return {
    headers: {
      ...headers,
      "Authorization": `Bearer ${key}`
    }
  }
})


const client = new ApolloClient({
  link: from([removeTypenameFromMutationLink, authLink.concat(httpLink), blogAuthLink.concat(blogLink)]),
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    <CssBaseline />
  </ThemeProvider>
);

// ReactDOM.render(
//   <ThemeProvider theme={theme}>
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>
//     <CssBaseline />
//   </ThemeProvider>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
