import UserConstants from '../constants/userConstants.js';
import Dispatcher from '../dispatcher/dispatcher.js';

const UserActions = {

  singleUserReceived: function(user) {
    Dispatcher.dispatch({
      actionType: UserConstants.SINGLE_USER_RECEIVED,
      user: user
    });
  },

  allUsersReceived: function(users) {
    Dispatcher.dispatch({
      actionType: UserConstants.ALL_USERS_RECEIVED,
      users: users
    });
  }


};

export default UserActions;
