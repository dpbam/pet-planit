import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Donate from './pages/Donate';
import Profile from './pages/Profile';
import PawFeed from './pages/PawFeed';
import SinglePawFeed from './pages/SinglePawFeed';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

//middleware function retrieve the token and combine with existing httpLink later
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

//combine authLink with existing httpLink
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header />
          <div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/pawfeed' component={PawFeed} />
              <Route exact path='/pawfeed/:id' component={SinglePawFeed} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/donate' component={Donate} />
              {/* Possible solution to if a user hits a relative path that doesn't exist, can change later */}
              <Route render={() => <h2>404</h2>} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
