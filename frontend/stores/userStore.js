var Store = require('flux/utils').Store;
import Dispatcher from '../dispatcher/dispatcher.js';
import UserConstants from '../constants/userConstants.js';

var UserStore = new Store(Dispatcher);
var _users = [];

UserStore.all = function () {
  return _users;
};

UserStore.find = function (id) {
  for (var i = 0; i < _users.length; i++) {
    if (_users[i].id == id) {
      return _users[i];
    }
  }
};

UserStore.resetUsers = function (user) {
  _users = user;
};

UserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case UserConstants.SINGLE_USER_RECEIVED:
      UserStore.resetUsers(payload.user);
      UserStore.__emitChange();
      break;
    }
};

export default UserStore;
