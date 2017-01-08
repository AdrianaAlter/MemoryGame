var Store = require('flux/utils').Store;
import Dispatcher from '../dispatcher/dispatcher.js';
import UserConstants from '../constants/userConstants.js';

var UserStore = new Store(Dispatcher);
var _users = [];
var _current;

UserStore.current = function() {
  return _current;
};

UserStore.all = function(){
  return _users;
};

UserStore.resetCurrent = function(user) {
  _current = user;
};

UserStore.resetUsers = function(users){
  _users = users;
};

UserStore.highScores = function(){
  var scores = {};
  _users.map(function(user){
    scores[user.user_name] = user.high_score;
  });
  return _.invert(scores);
};

UserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case UserConstants.SINGLE_USER_RECEIVED:
      UserStore.resetCurrent(payload.user);
      UserStore.__emitChange();
      break;
    case UserConstants.ALL_USERS_RECEIVED:
      UserStore.resetUsers(payload.users);
      UserStore.__emitChange();
      break;
    }
};

export default UserStore;
