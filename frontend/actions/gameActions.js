import GameConstants from '../constants/gameConstants.js';
import Dispatcher from '../dispatcher/dispatcher.js';

const GameActions = {
  // picturesReceived: function(pictures){
  //   Dispatcher.dispatch({
  //     actionType: GameConstants.PICTURES_RECEIVED,
  //     pictures: pictures
  //   });
  // },
  gameStarted: function(game){
    Dispatcher.dispatch({
      actionType: GameConstants.GAME_STARTED,
      game: game
    });
  },
  gameReceived: function(game){
    Dispatcher.dispatch({
      actionType: GameConstants.GAME_RECEIVED,
      game: game
    });
  }
};

export default GameActions
