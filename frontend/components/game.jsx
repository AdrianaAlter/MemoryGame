import React from 'react'
import Timer from './timer.jsx'
import CardIndex from './cardIndex.jsx'
import ApiUtil from '../util/apiUtil.js'
import GameStore from '../stores/gameStore.js'
import CardStore from '../stores/cardStore'
import SessionStore from '../stores/sessionStore.js'
import UserStore from '../stores/userStore.js'

var Game = React.createClass({
  getInitialState: function(){
    return { game: GameStore.all(), won: false, time: 0, score: 0 };
  },
  componentDidMount: function(){
    this.listener = GameStore.addListener(this._onChange);
  },
  componentWillUnmount: function(){
    this.listener.remove();
  },
  _onChange: function(){
    this.setState({ game: GameStore.all() });
  },
  isWon: function(){
    this.setState({ won: true });
    this.score();
  },
  finalTime: function(time){
    this.setState({ time: time })
  },
  score: function(){
    var marker = (this.state.game[0].level + 1) * 30;
    var bonus = marker - this.state.time;
    this.setState({ score: (bonus * 2) + 10 });
  },
  render: function(){
    if (this.state.game.length > 0){
      var wonStatus = this.state.won ? "" : "hidden";
      var timer = this.state.won ? <div></div> : <Timer finalTime={this.finalTime}/>
      return (
        <div id="game">
          <h1>NYT Games Code Test</h1>
          <CardIndex level={this.state.game[0].level} gameId={this.state.game[0].id} isWon={this.isWon} />
          {timer}
          <section id="won" className={wonStatus}>Score: {this.state.score}</section>
          <div>Let the games begin (here).</div>
        </div>
      )
    }
    else {
      return <div></div>
    }
  }
});

export default Game
