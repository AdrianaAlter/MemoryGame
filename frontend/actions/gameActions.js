import GameConstants from '../constants/gameConstants.js';
import Dispatcher from '../dispatcher/dispatcher.js';

var GameActions = {
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
