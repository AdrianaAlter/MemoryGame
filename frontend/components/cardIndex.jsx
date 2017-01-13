import React from 'react'
import ApiUtil from '../util/apiUtil'
import CardStore from '../stores/cardStore'
import GameStore from '../stores/gameStore'
import Card from './card'

class CardIndex extends React.Component {

  constructor(){
    super();
    this.state = { cards: CardStore.all(), selected: CardStore.selected(), matched: CardStore.matched(), won: false };
    this.selectCard = this.selectCard.bind(this);
    this.makeCards = this.makeCards.bind(this);
    this.flipDown = this.flipDown.bind(this);
    this.match = this.match.bind(this);
  }

  componentDidMount(){
    this.makeCards();
    this.listener = CardStore.addListener(this._onChange.bind(this));
  }

  componentWillUnmount(){
    this.listener.remove();
  }

  makeCards(){
    if (this.state.cards.length === 0){
      let gameId = this.props.gameId;
      this.props.pics.map(function(picture){
        ApiUtil.createCard(picture, gameId);
      });
    }
  }

  _onChange(){
    this.setState({ cards: CardStore.all(), selected: CardStore.selected(), matched: CardStore.matched() });
    if (this.state.selected.length == 2){
      this.props.tried();
      this.checkSelected();
    }
  }

  selectCard(cardId){
    this.props.playSound('flip.wav');
    this.props.isStarted();
    let card = {flipped: true};
    ApiUtil.updateCard(this.props.gameId, cardId, card);
  }

  checkSelected(){
      let [card1, card2] = this.state.selected;
      if (card1.picture == card2.picture){
        this.props.playSound('match.mp3');
        this.match(this.props.gameId, card1, card2);
        this.checkWon();
      }
      else {
        this.props.playSound('wrong.wav');
        this.flipDown(this.props.gameId, card1, card2);
      }
  }

  match(gameId, ...cards){
    let updated = {flipped: false, matched: true}
    cards.map(function(card){
      ApiUtil.updateCard(gameId, card.id, updated);
    });
  }
  flipDown(gameId, ...cards){
    let updated = {flipped: false}
    setTimeout(function(){
      cards.map(function(card){
        ApiUtil.updateCard(gameId, card.id, updated);
      });
    }, 500);
  }

  checkWon(){
    if (this.state.matched.length == (this.state.cards.length - 2)){
      this.props.isWon();
    }
  }

  render(){
    var content;
    if (_.isEmpty(this.state.cards)){
      content = <div>Loading...</div>
    }
    let cardLis = this.state.cards.map((card) => {
      var [,,,flipped, matched] = Object.entries(card);
      var status;
      [flipped, matched].map(function(property){
        var [name, value] = property;
        if (value){
           status = name;
        }
      });
      let className = `card ${this.props.theme} ${status}`;
      return <Card key={card.id} card={card} className={className} selectCard={this.selectCard} />
    });
    content = <ul className="group" id="cards">{cardLis}</ul>;
    return <div>{content}</div>;
  }

}

export default CardIndex
