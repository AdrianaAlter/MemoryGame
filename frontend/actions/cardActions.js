import CardConstants from '../constants/cardConstants.js';
import Dispatcher from '../dispatcher/dispatcher.js';

var CardActions = {
  picturesReceived: function(pictures){
    Dispatcher.dispatch({
      actionType: CardConstants.PICTURES_RECEIVED,
      pictures: pictures
    });
  },
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
  selectCard: function(card){
    Dispatcher.dispatch({
      actionType: CardConstants.CARD_SELECTED,
      card: card
    });
  },
  markMatched: function(picture){
    Dispatcher.dispatch({
      actionType: CardConstants.PICTURE_MATCHED,
      picture: picture
    });
  },
  clear: function(){
    Dispatcher.dispatch({
      actionType: CardConstants.CLEAR
    });
  }
};

export default CardActions
