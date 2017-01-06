var Store = require('flux/utils').Store;
import Dispatcher from '../dispatcher/dispatcher.js';
import GameConstants from '../constants/gameConstants.js';

var GameStore = new Store(Dispatcher);

var _games = [];

GameStore.all = function(){
  return _games;
};

GameStore.resetGames = function(game){
  _games = [game];
};

GameStore.clear = function(){
  _games = [];
};

GameStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case GameConstants.GAME_STARTED:
      GameStore.resetGames(payload.game);
      GameStore.__emitChange();
      break;
  }
};

module.exports = GameStore;
