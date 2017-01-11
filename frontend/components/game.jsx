import React from 'react'
import Timer from './timer.jsx'
import CardIndex from './cardIndex.jsx'
import Won from './won.jsx'
import ApiUtil from '../util/apiUtil.js'
import GameStore from '../stores/gameStore.js'
import SessionStore from '../stores/sessionStore.js'
import {Link} from 'react-router'

class Game extends React.Component {

  constructor(){
    super();
    this.state = { game: GameStore.all(), pics: GameStore.allPictures(), won: false, started: false, time: 0, score: 0, tries: 0, user: SessionStore.currentUser() };
    this.isWon = this.isWon.bind(this);
    this.isStarted = this.isStarted.bind(this);
    this.finalTime = this.finalTime.bind(this);
    this.score = this.score.bind(this);
    this.tried = this.tried.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.clearGame = this.clearGame.bind(this);
  }

  componentDidMount(){
    ApiUtil.loadUserInfo(this.state.user.id);
    // if (this.state.user.cards){
    //   this.setState({ cards: this.state.user.cards })
    // }
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
    // ApiUtil.deleteGame(this.state.game.id);
    this.listener.remove();
  }

  _onChange(){
    this.setState({ game: GameStore.all(), user: SessionStore.currentUser(), pics: GameStore.allPictures(), mute: false });
  }

  isWon(){
    if (!this.state.mute){
      var wonSound = new Audio('assets/won.wav');
      wonSound.play();
    }
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

  toggleMute(){
    this.state.mute ? this.setState({ mute: false }) : this.setState({ mute: true });
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
    var extraTries = this.state.tries - (this.state.pics.length / 2);
    var score = ((bonus * 2) + 10) - extraTries;
    this.setState({ score: score });
    if ((this.state.user.user_name !== "guest") && (score > this.state.user.high_score)){
      var user = {};
      user.high_score = score;
      ApiUtil.updateUser(this.state.user.id, user);
    }
  }

  tried(){
    var tries = this.state.tries + 1
    this.setState({ tries: tries })
    this.setState({ tries: tries })
  }

  clearGame(){
    if (this.state.game){
      ApiUtil.deleteGame(this.state.game.id);
    }
    else {
      this.context.router.push("/");
    }
  }

  render(){
    if (this.state.user && this.state.user.user_name !== "guest"){
      var highScore = this.state.user.high_score;
    }
    var gameContent;
    var name = this.state.user.user_name;
    var muteIcon = this.state.mute ? "fa fa-volume-up fa-lg" : "fa fa-volume-off fa-lg";
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
      gameContent = (
        <div id="game">
          <section>
            <h1>Tries: {this.state.tries}</h1>
            {timer}
            <h1><i className={muteIcon} onClick={this.toggleMute}></i></h1>
          </section>
          <CardIndex mute={this.state.mute} cards={this.state.cards} pics={this.state.pics} theme={this.state.game.theme} saved={saved} level={this.state.game.level} gameId={this.state.game.id} isWon={this.isWon} isStarted={this.isStarted} tried={this.tried} />
          <Won won={wonStatus} name={name} highScore={highScore} score={this.state.score} gameId={this.state.game.id} />
        </div>
      )
    }
    else {
      gameContent = <div id="game"><div id="placeholder" onClick={this.clearGame}><h1>Click here to start playing!</h1></div></div>
    }
    return gameContent;

  }
}
Game.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Game
