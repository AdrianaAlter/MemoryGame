const Store = require('flux/utils').Store;
import Dispatcher from '../dispatcher/dispatcher.js';
import GameConstants from '../constants/gameConstants.js';

const GameStore = new Store(Dispatcher);

let _game;

GameStore.all = function(){
  return _game;
};

GameStore.resetGame = function(game){
  _game = game;
};

GameStore.clear = function(){
  _game = [];
};

GameStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case GameConstants.GAME_STARTED:
      GameStore.resetGame(payload.game);
      GameStore.__emitChange();
      break;
    case GameConstants.GAME_RECEIVED:
      GameStore.resetGame(payload.game);
      GameStore.__emitChange();
      break;
  }
};

module.exports = GameStore;
