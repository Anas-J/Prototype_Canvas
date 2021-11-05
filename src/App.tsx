import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/core';
import store from './store';
import AppWithRouterAccess from './AppWithRouterAccess';
import './App.css';

const apolloClient = new ApolloClient({
  uri: 'https://canvas3-server.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

const App = () => (
  <Provider store={store}>
    <Router>
      <ApolloProvider client={apolloClient}>
        <AppWithRouterAccess />
      </ApolloProvider>
    </Router>
  </Provider>
);

export default App;
