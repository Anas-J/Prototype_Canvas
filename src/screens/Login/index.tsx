import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Redirect } from 'react-router-dom';
import Table from '../../components/table/index';
import './index.scss';

const Login = () => {
  const { oktaAuth, authState } = useOktaAuth();

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  const button = authState.isAuthenticated ? (
    <button
      type="button"
      className="loginBtn"
      onClick={() => {
        oktaAuth.signOut('/');
      }}
    >
      Logout
    </button>
  ) : (
    <div>
      <Table computeTotal={false} />
      <button
        type="button"
        className="loginBtn"
        onClick={() => {
          oktaAuth.signInWithRedirect();
        }}
      >
        Login
      </button>
    </div>
  );

  return authState.isAuthenticated ? (
    <Redirect
      to={{
        pathname: '/report',
      }}
    />
  ) : (
    <article className="loginContainer">
      <div>{button}</div>
    </article>
  );
};

export default Login;
