import React from 'react'
import Timer from './timer.jsx'
import CardIndex from './cardIndex.jsx'
import Won from './won.jsx'
import ApiUtil from '../util/apiUtil.js'
import GameStore from '../stores/gameStore.js'
import CardStore from '../stores/cardStore'
import SessionStore from '../stores/sessionStore.js'
import UserStore from '../stores/userStore.js'

class Game extends React.Component {
  constructor(){
    super();
    this.state = { game: GameStore.all(), won: false, time: 0, score: 0, user: UserStore.current() };
    this.isWon = this.isWon.bind(this);
    this.finalTime = this.finalTime.bind(this);
    this.score = this.score.bind(this);
  }
  componentDidMount(){
    this.listener = GameStore.addListener(this._onChange.bind(this));
  }
  componentWillUnmount(){
    this.listener.remove();
  }
  _onChange(){
    this.setState({ game: GameStore.all() });
  }
  isWon(){
    this.setState({ won: true });
    this.score();
  }
  finalTime(time){
    this.setState({ time: time })
  }
  score(){
    var marker = (this.state.game[0].level + 1) * 60;
    var bonus = (marker - this.state.time) >= 0 ? (marker - this.state.time) : 0;
    var score = (bonus * 2) + 10;
    this.setState({ score: score });
    if ((this.state.user.user_name !== "guest") && (score > this.state.user.high_score)){
      var user = {};
      user.high_score = score;
      ApiUtil.updateUser(this.state.user.id, user);
    }
  }
  render(){
    if (this.state.user){
      var highScore = this.state.user.user_name == "guest" ? null : this.state.user.high_score;
    }
    if (this.state.game.length > 0){
      // var isNew = this.state.game[0].cards.length > 0 ? false : true;
      var wonStatus = this.state.won ? true : false;
      var timer = this.state.won ? <h1>Done!</h1> : <Timer finalTime={this.finalTime}/>
      return (
        <div id="game">
          {timer}
          <CardIndex theme={this.state.game[0].theme} level={this.state.game[0].level} gameId={this.state.game[0].id} isWon={this.isWon} />
          <Won won={wonStatus} highScore={highScore} score={this.state.score} gameId={this.state.game[0].id} />
        </div>
      )
    }
    else {
      return <div></div>
    }
  }
}

export default Game
