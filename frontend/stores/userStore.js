const Store = require('flux/utils').Store;
import Dispatcher from '../dispatcher/dispatcher.js';
import UserConstants from '../constants/userConstants.js';

const UserStore = new Store(Dispatcher);
let _users = [];
let _current;

UserStore.current = function() {
  return _current;
};

UserStore.all = function(){
  return _users;
};

UserStore.resetCurrent = function(user) {
  _current = user;
  let i = _users.findIndex(x => x.id === user.id);
  _users[i] = user;
};

UserStore.resetUsers = function(users){
  _users = users;
};

UserStore.highScores = function(){
  let scores = [];
  _.reject(_users, {user_name: 'guest'}).map(function(user){
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
