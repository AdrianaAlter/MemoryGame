import React from 'react'
import ApiUtil from '../util/apiUtil'
import CardStore from '../stores/cardStore'
import Card from './card'

var CardIndex = React.createClass({
  getInitialState: function(){
    return { pictures: CardStore.allPictures(), cards: CardStore.all(), selected: CardStore.selected(), matched: CardStore.matched(), won: false };
  },
  componentDidMount: function(){
    ApiUtil.getPictures(this.props.level);
    this.listener = CardStore.addListener(this._onChange);
  },
  componentWillUnmount: function(){
    this.listener.remove();
  },
  makeCards: function(){
    var gameId = this.props.gameId;
    this.state.pictures.map(function(picture){
      ApiUtil.createCard(picture, gameId);
    });
  },
  _onChange: function(){
    this.setState({ pictures: CardStore.allPictures(), cards: CardStore.all(), selected: CardStore.selected(), matched: CardStore.matched() });
    if (this.state.selected.length == 2){
      this.checkSelected();
    }
  },
  selectCard: function(cardId){
    var card = {};
    card.flipped = true;
    ApiUtil.updateCard(this.props.gameId, cardId, card);

  },
  checkSelected: function(){
      var card = {};
      if (this.state.selected[0].picture == this.state.selected[1].picture){
        card.matched = true;
        this.checkWon();
      }
      card.flipped = false;
      ApiUtil.updateCard(this.props.gameId, this.state.selected[0].id, card);
      ApiUtil.updateCard(this.props.gameId, this.state.selected[1].id, card);
  },
  checkWon: function(){
    if (this.state.matched.length == (this.state.cards.length - 2)){
      this.setState({ won: true });
    }
  },
  render: function(){
    var self = this;
    var wonStatus = this.state.won ? "" : "hidden";
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
        return <Card key={card.id} card={card} status={status} selectCard={self.selectCard} />
      });
      return (<div>
                <ul className="group" id="cards">{cardLis}</ul>
                <section id="won" className={wonStatus}></section>
              </div>)
    }
    if (this.state.pictures.length > 0){
      return (<button onClick={this.makeCards}>GO</button>);
    }
    else {
      return <div></div>
    }
  }

});

export default CardIndex
