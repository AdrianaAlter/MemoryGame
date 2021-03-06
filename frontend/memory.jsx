import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './components/app.jsx';
import Welcome from './components/welcome.jsx';
import Game from './components/game.jsx';
import Setup from './components/setup.jsx';
import SessionStore from './stores/sessionStore';
import ApiUtil from './util/apiUtil';
import Modal from 'react-modal';

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App} onEnter={_mustLogIn}>
      <IndexRoute component={Setup} />
      <Route path="game" component={Game} />
    </Route>
    <Route path="/login" component={Welcome} />
  </Router>
)

document.addEventListener('DOMContentLoaded', function(){
  Modal.setAppElement(root);
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
