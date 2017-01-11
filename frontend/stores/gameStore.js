var Store = require('flux/utils').Store;
import Dispatcher from '../dispatcher/dispatcher.js';
import GameConstants from '../constants/gameConstants.js';

var GameStore = new Store(Dispatcher);

var _game;
var _pictures = [];

GameStore.all = function(){
  // debugger
  return _game;
};

GameStore.allPictures = function(){
  return _pictures;
};

GameStore.resetGame = function(game){
  // debugger
  _game = game;
};

GameStore.resetPictures = function(pictures){
  // debugger
  _pictures = _.shuffle(pictures);
};

GameStore.clear = function(){
  _game = [];
};

GameStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case GameConstants.PICTURES_RECEIVED:
      GameStore.resetPictures(payload.pictures);
      GameStore.__emitChange();
      break;
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
