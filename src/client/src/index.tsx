import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
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

// Eagerly loaded components (needed immediately)
import {
  Home,
  AppHeader,
  NotFound,
} from './sections';
import { HomeInfoSkeleton } from './lib/components';
import { DisplayError } from './lib/utils';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import "@fontsource/noto-serif/";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Skeleton, CircularProgress, Box, LinearProgress } from '@mui/material';
import theme from './theme';
// import { Viewer } from './lib/types';
import { Viewer, useLogInMutation } from './graphql/generated';
import { ScrollToTop } from './lib/utils/scrollToTop';

// Lazy loaded components for code splitting
const Dashboard = lazy(() => import('./sections/Dashboard').then(m => ({ default: m.Dashboard })));
const Lesson = lazy(() => import('./sections/Lesson').then(m => ({ default: m.Lesson })));
const Lessons = lazy(() => import('./sections/Lessons').then(m => ({ default: m.Lessons })));
const User = lazy(() => import('./sections/User').then(m => ({ default: m.User })));
const Terms = lazy(() => import('./sections/Terms').then(m => ({ default: m.Terms })));
const Privacy = lazy(() => import('./sections/Privacy').then(m => ({ default: m.Privacy })));
const Pricing = lazy(() => import('./sections/Pricing').then(m => ({ default: m.Pricing })));
const Login = lazy(() => import('./sections/Login').then(m => ({ default: m.Login })));
const ForgotPassword = lazy(() => import('./sections/ForgotPassword').then(m => ({ default: m.ForgotPassword })));
const ResetPassword = lazy(() => import('./sections/ResetPassword').then(m => ({ default: m.ResetPassword })));
const Playlist = lazy(() => import('./sections/Playlist').then(m => ({ default: m.Playlist })));
const PlaylistsCatalog = lazy(() => import('./sections/PlaylistsCatalog').then(m => ({ default: m.PlaylistsCatalog })));
const CreatePlaylist = lazy(() => import('./sections/CreatePlaylist').then(m => ({ default: m.CreatePlaylist })));
const CreateLesson = lazy(() => import('./sections/CreateLesson').then(m => ({ default: m.CreateLesson })));
const CreateQuiz = lazy(() => import('./sections/CreateQuiz').then(m => ({ default: m.CreateQuiz })));
const CreateArticle = lazy(() => import('./sections/CreateArticle').then(m => ({ default: m.CreateArticle })));
const EditPlaylist = lazy(() => import('./sections/EditPlaylist').then(m => ({ default: m.EditPlaylist })));
const Catalog = lazy(() => import('./sections/Catalog').then(m => ({ default: m.Catalog })));
const Contact = lazy(() => import('./sections/Contact').then(m => ({ default: m.Contact })));
const Quiz = lazy(() => import('./sections/Quiz').then(m => ({ default: m.Quiz })));
const Donate = lazy(() => import('./sections/Donate').then(m => ({ default: m.Donate })));
const SignUp = lazy(() => import('./sections/SignUp').then(m => ({ default: m.SignUp })));
const Article = lazy(() => import('./sections/Article').then(m => ({ default: m.Article })));
const Plans = lazy(() => import('./sections/Plans').then(m => ({ default: m.Plans })));
const ArticlesCatalog = lazy(() => import('./sections/ArticlesCatalog').then(m => ({ default: m.ArticlesCatalog })));
const BlogHub = lazy(() => import('./sections/BlogHub').then(m => ({ default: m.BlogHub })));
const BlogPost = lazy(() => import('./sections/BlogPost').then(m => ({ default: m.BlogPost })));
const BlogCategory = lazy(() => import('./sections/BlogCategory').then(m => ({ default: m.BlogCategory })));

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

// Loading fallback for lazy-loaded routes
const PageLoader = () => (
  <Box sx={{ width: '100%', mt: 2 }}>
    <LinearProgress />
  </Box>
);

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
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home viewer={viewer} />} />
            <Route path="/dash" element={<Dashboard viewer={viewer} />} />
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
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
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
        </Suspense>
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

reportWebVitals();
