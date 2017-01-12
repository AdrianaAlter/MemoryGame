import CardConstants from '../constants/cardConstants.js';
import Dispatcher from '../dispatcher/dispatcher.js';

const CardActions = {
  cardReceived: function(cards){
    Dispatcher.dispatch({
      actionType: CardConstants.CARDS_RECEIVED,
      cards: cards
    });
  },
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
  },
  clear: function(){
    Dispatcher.dispatch({
      actionType: CardConstants.CLEAR
    });
  }
};

export default CardActions;
