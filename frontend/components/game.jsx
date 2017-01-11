import React from 'react'
import Timer from './timer.jsx'
import CardIndex from './cardIndex.jsx'
import Won from './won.jsx'
import Setup from './setup.jsx'
import ApiUtil from '../util/apiUtil.js'
import GameStore from '../stores/gameStore.js'
import CardStore from '../stores/cardStore'
import SessionStore from '../stores/sessionStore.js'
import UserStore from '../stores/userStore.js'

class Game extends React.Component {
  constructor(){
    super();
    this.state = { game: GameStore.all(), pics: GameStore.allPictures(), won: false, started: false, time: 0, score: 0, user: SessionStore.currentUser() };
    this.isWon = this.isWon.bind(this);
    this.isStarted = this.isStarted.bind(this);
    this.finalTime = this.finalTime.bind(this);
    this.score = this.score.bind(this);
  }
  componentDidMount(){

    // ApiUtil.getPictures(this.state.game[0].level);
    this.listener = GameStore.addListener(this._onChange.bind(this));

    // if (!this.state.game){
    //   this.context.router.push("/");
    // }
  }
  componentWillUnmount(){
    // if (this.state.game[0] && !this.state.game[0].saved){
    //   ApiUtil.deleteGame(this.state.game[0].id);
    // }

    this.listener.remove();
  }
  _onChange(){

    this.setState({ game: GameStore.all(), user: SessionStore.currentUser(), pics: GameStore.allPictures() });
  }
  isWon(){
    this.setState({ won: true });
    this.score();
  }
  isStarted(){
    if (!this.state.started){
      this.setState({ started: true});
      var game = {};
      game.started = true;
      ApiUtil.updateGame(this.state.game.id, game)
    }
  }
  finalTime(time){
    this.setState({ time: time });
    var game = {};
    game.final_time = time;
    ApiUtil.updateGame(this.state.game.id, game);
  }
  score(){
    var marker = (this.state.game.level + 1) * 60;
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

    if (this.state.user && this.state.user.user_name !== "guest"){
      var highScore = this.state.user.high_score;
    }
    var name = this.state.user.user_name;
    if (this.state.game && this.state.pics.length > 0){
      var saved = this.state.game.saved ? "saved" : "";
      var wonStatus = this.state.won ? true : false;
      var timer;
      if (!this.state.started){
        timer = <h1>Pick a card...</h1>
      }
      else if (this.state.won){
        timer = <h1>Done!</h1>
      }
      else {
        timer = <Timer finalTime={this.finalTime}/>
      }
      return (
        <div id="game">
          {timer}
          <CardIndex pics={this.state.pics} theme={this.state.game.theme} saved={saved} level={this.state.game.level} gameId={this.state.game.id} isWon={this.isWon} isStarted={this.isStarted}/>
          <Won won={wonStatus} name={name} highScore={highScore} score={this.state.score} gameId={this.state.game.id} />
        </div>
      )
    }
    else {
      return <div>HISS</div>
    }
  }
}
Game.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Game
