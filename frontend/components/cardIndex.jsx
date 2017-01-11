import React from 'react'
import ApiUtil from '../util/apiUtil'
import CardStore from '../stores/cardStore'
import GameStore from '../stores/gameStore'
import Card from './card'

class CardIndex extends React.Component {
  constructor() {
    super();
    this.state = { cards: CardStore.all(), selected: CardStore.selected(), matched: CardStore.matched(), won: false };
    this.selectCard = this.selectCard.bind(this);
    this.makeCards = this.makeCards.bind(this);
  }
  componentDidMount() {
    this.makeCards();
    this.listener = CardStore.addListener(this._onChange.bind(this));
    // this.listener2 = GameStore.addListener(this.makeCards);
  }
  componentWillUnmount() {
    this.listener.remove();

    // this.listener2.remove();
  }
  makeCards() {
    // debugger
    if (this.state.cards.length === 0){
    //   debugger
      var gameId = this.props.gameId;
      this.props.pics.map(function(picture){
        ApiUtil.createCard(picture, gameId);
      });
    }
    // else {
    //   debugger
    //   CardStore.clear();

      //  ApiUtil.deleteGame(this.props.gameId);
    // }
  }
  _onChange() {
    this.setState({ cards: CardStore.all(), selected: CardStore.selected(), matched: CardStore.matched() });
    if (this.state.selected.length == 2){
      this.checkSelected();
    }
  }
  selectCard(cardId) {
    this.props.isStarted();
    var card = {};
    card.flipped = true;
    ApiUtil.updateCard(this.props.gameId, cardId, card);
  }
  checkSelected() {
      var card = {};
      var self = this;
      if (this.state.selected[0].picture == this.state.selected[1].picture){
        card.matched = true;
        card.flipped = false;
        ApiUtil.updateCard(self.props.gameId, self.state.selected[0].id, card);
        ApiUtil.updateCard(self.props.gameId, self.state.selected[1].id, card);
        this.checkWon();
      }
      else {
        card.flipped = false;
        setTimeout(function(){
          ApiUtil.updateCard(self.props.gameId, self.state.selected[0].id, card);
          ApiUtil.updateCard(self.props.gameId, self.state.selected[1].id, card);
        }, 750);
      }
  }
  checkWon() {
    if (this.state.matched.length == (this.state.cards.length - 2)){
      this.props.isWon();
    }
  }
  render() {
    var self = this;
    if (this.state.cards.length > 0){
      var cardLis = this.state.cards.map(function(card){
        var status;
        if (card.matched){
          status = "matched";
        }
        else if (card.flipped){
          status = "face-up";
        }
        else {
          status = "";
        }
        return <Card key={card.id} card={card} saved={self.props.saved} theme={self.props.theme} status={status} selectCard={self.selectCard} />
      });
      return (<div>
                <ul className="group" id="cards">{cardLis}</ul>
              </div>)
    }
    else {
      return <div>Loading...</div>
    }

    // if (this.props.pics.length > 0){
    //   this.makeCards();
    //   return <div></div>
    // }
    // else {
    //   return <div></div>
    // }
  }

}

export default CardIndex
