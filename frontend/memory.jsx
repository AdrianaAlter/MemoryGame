import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './components/app.jsx';
import Welcome from './components/welcome.jsx';
import SessionStore from './stores/sessionStore';
import ApiUtil from './util/apiUtil';

var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App} onEnter={_mustLogIn} />
    <Route path="/login" component={Welcome} />
  </Router>
)

document.addEventListener('DOMContentLoaded', () => {
  var header = <h1>purring...?</h1>
  const root = document.getElementById('root');
  ReactDOM.render(routes, root);
});

function _mustLogIn(nextState, replace, asyncCompletionCallback) {
  if (!SessionStore.currentUserFetched()) {
    ApiUtil.fetchCurrentUser(_redirectToLogIn);
  }
  else {
    _redirectToLogIn();
  }
  function _redirectToLogIn() {
    if (!SessionStore.isLoggedIn()) {
      replace("/login");
    }
    asyncCompletionCallback();
  }
};
