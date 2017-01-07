import React from 'react'
import Timer from './timer.jsx'
import CardIndex from './cardIndex.jsx'
// import Button from './button.jsx'
import ApiUtil from '../util/apiUtil.js'
import GameStore from '../stores/gameStore.js'
import SessionStore from '../stores/sessionStore.js'
import UserStore from '../stores/userStore.js'

var Game = React.createClass({
  getInitialState: function(){
    return { game: GameStore.all() };
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

  render: function(){
    if (this.state.game.length > 0){
      return (
        <div id="game">
          <h1>NYT Games Code Test</h1>
          <CardIndex level={this.state.game[0].level} gameId={this.state.game[0].id} />
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
