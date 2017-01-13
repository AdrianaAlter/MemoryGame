import CardConstants from '../constants/cardConstants.js';
import Dispatcher from '../dispatcher/dispatcher.js';

const CardActions = {
  cardAdded: function(card){
    Dispatcher.dispatch({
      actionType: CardConstants.CARD_ADDED,
      card: card
    });
  },
  updatedCardReceived: function(card){
    Dispatcher.dispatch({
      actionType: CardConstants.UPDATED_CARD_RECEIVED,
      card: card
    });
  }
};

export default CardActions;
