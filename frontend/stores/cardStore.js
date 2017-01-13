const Store = require('flux/utils').Store;
import Dispatcher from '../dispatcher/dispatcher.js';
import CardConstants from '../constants/cardConstants.js';

const CardStore = new Store(Dispatcher);

let _cards = [];

CardStore.all = function(){
  return _cards;
};

CardStore.selected = function(){
  return _.where(_cards, {flipped: true});
};

CardStore.matched = function(){
  return _.where(_cards, {matched: true});
};

CardStore.addCard = function(card){
  _cards.push(card);
};

CardStore.resetCard = function(card){
  let i = _cards.findIndex(x => x.id === card.id);
  _cards[i] = card;
};

CardStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case CardConstants.CARD_ADDED:
      CardStore.addCard(payload.card);
      CardStore.__emitChange();
      break;
    case CardConstants.UPDATED_CARD_RECEIVED:
      CardStore.resetCard(payload.card);
      CardStore.__emitChange();
      break;
  }
};

module.exports = CardStore;
