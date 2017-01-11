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
  for (var i = 0; i < _users.length; i++){
    if (_users[i].id == user.id){
      _users[i] = user;
    }
  }
};

UserStore.resetUsers = function(users){
  _users = users;
};

UserStore.highScores = function(){
  var scores = [];
  _users.map(function(user){
    scores.push({ name: user.user_name, score: user.high_score });
  });
  return _.sortBy(scores, 'score').reverse();
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
