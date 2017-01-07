import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, hashHistory, IndexRoute, Link } from 'react-router';
import App from './components/app.jsx';
import Welcome from './components/welcome.jsx';
import Game from './components/game.jsx';
import SessionStore from './stores/sessionStore';
import ApiUtil from './util/apiUtil';

var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App} onEnter={_mustLogIn}>
      <IndexRoute component={Game} />
    </Route>
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
