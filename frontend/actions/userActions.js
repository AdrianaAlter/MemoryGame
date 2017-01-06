import UserConstants from '../constants/userConstants.js';
import Dispatcher from '../dispatcher/dispatcher.js';

var UserActions = {

  singleUserReceived: function (user) {
    Dispatcher.dispatch({
      actionType: UserConstants.SINGLE_USER_RECEIVED,
      user: user
    });
  }


};

export default UserActions;
