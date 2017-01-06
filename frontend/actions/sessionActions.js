import Dispatcher from '../dispatcher/dispatcher.js';
import SessionConstants from '../constants/sessionConstants.js';

var SessionActions = {
  currentUserReceived: function(currentUser) {
    Dispatcher.dispatch({
      actionType: SessionConstants.CURRENT_USER_RECEIVED,
      currentUser: currentUser
    });
  },

  logOut: function () {
    Dispatcher.dispatch({
      actionType: SessionConstants.LOGOUT,
    });
  }

};

export default SessionActions;
