var Store = require('flux/utils').Store;
import Dispatcher from '../dispatcher/dispatcher.js';
import CardConstants from '../constants/cardConstants.js';

var CardStore = new Store(Dispatcher);

var _pictures = [];
var _cards = [];

CardStore.all = function(){
  return _cards;
};
CardStore.allPictures = function(){
  return _pictures;
};
CardStore.selected = function(){
  return _.where(_cards, {flipped: true});
};
CardStore.matched = function(){
  return _.where(_cards, {matched: true});
};
CardStore.resetPictures = function(pictures){
  _pictures = pictures;
};
CardStore.addCard = function(card){
  _cards.push(card);
};
CardStore.resetCard = function(card){
  for (var i = 0; i < _cards.length; i++){
    if (_cards[i].id == card.id){
      _cards[i] = card;
    }
  }
};

CardStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case CardConstants.PICTURES_RECEIVED:
      CardStore.resetPictures(payload.pictures);
      CardStore.__emitChange();
      break;
    case CardConstants.CARD_ADDED:
      CardStore.addCard(payload.card);
      CardStore.__emitChange();
      break;
    case CardConstants.UPDATED_CARD_RECEIVED:
      CardStore.resetCard(payload.card);
      CardStore.__emitChange();
      break;
    case CardConstants.CARDS_RECEIVED:
      CardStore.resetCards(payload.cards);
      CardStore.__emitChange();
      break;
    case CardConstants.CARD_SELECTED:
      CardStore.selectCard(payload.card);
      CardStore.__emitChange();
      break;
  }
};

module.exports = CardStore;
