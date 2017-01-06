var Store = require('flux/utils').Store;
import SessionConstants from '../constants/sessionConstants.js';
import Dispatcher from '../dispatcher/dispatcher.js';

var SessionStore = new Store(Dispatcher);

var _currentUser;
var _currentUserFetched = false;

SessionStore.currentUser = function () {
  return _currentUser;
};

SessionStore.currentUserFetched = function () {
  return _currentUserFetched;
};

SessionStore.isLoggedIn = function () {
  return !!_currentUser;
};

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case SessionConstants.CURRENT_USER_RECEIVED:
      _currentUser = payload.currentUser;
      _currentUserFetched = true;
			SessionStore.__emitChange();
      break;
    case SessionConstants.LOGOUT:
		  _currentUser = null;
      SessionStore.__emitChange();
      break;
  }
};


export default SessionStore;
