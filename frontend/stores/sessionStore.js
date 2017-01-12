const Store = require('flux/utils').Store;
import SessionConstants from '../constants/sessionConstants.js';
import Dispatcher from '../dispatcher/dispatcher.js';

const SessionStore = new Store(Dispatcher);

let _currentUser;
let _currentUserFetched = false;

SessionStore.currentUser = function(){
  return _currentUser;
};

SessionStore.currentUserFetched = function(){
  return _currentUserFetched;
};

SessionStore.isLoggedIn = function(){
  return !!_currentUser;
};

SessionStore.receiveCurrentUser = function(currentUser){
  _currentUser = currentUser;
  _currentUserFetched = true;
};

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case SessionConstants.CURRENT_USER_RECEIVED:
      SessionStore.receiveCurrentUser(payload.currentUser);
			SessionStore.__emitChange();
      break;
    case SessionConstants.LOGOUT:
		  _currentUser = null;
      SessionStore.__emitChange();
      break;
  }
};


export default SessionStore;
