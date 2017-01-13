import React from 'react'
import Timer from './timer.jsx'
import CardIndex from './cardIndex.jsx'
import Won from './won.jsx'
import ApiUtil from '../util/apiUtil.js'
import GameStore from '../stores/gameStore.js'
import SessionStore from '../stores/sessionStore.js'
import PictureStore from '../stores/pictureStore.js'
import {Link} from 'react-router'

class Game extends React.Component {

  constructor(){
    super();
    this.state = { game: GameStore.all(), pics: PictureStore.all(), won: false, started: false, time: 0, score: 0, tries: 0, user: SessionStore.currentUser() };
    this.isWon = this.isWon.bind(this);
    this.isStarted = this.isStarted.bind(this);
    this.finalTime = this.finalTime.bind(this);
    this.score = this.score.bind(this);
    this.tried = this.tried.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.clearGame = this.clearGame.bind(this);
    this.notGuest = this.notGuest.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  componentDidMount(){
    this.listener1 = GameStore.addListener(this._onChange.bind(this));
    this.listener2 = PictureStore.addListener(this._onChange.bind(this));
  }

  componentWillUnmount(){
    this.listener1.remove();
    this.listener2.remove();
  }

  _onChange(){
    this.setState({ game: GameStore.all(), user: SessionStore.currentUser(), pics: PictureStore.all(), mute: false });
  }

  isWon(){
    this.playSound('won.wav');
    this.setState({ won: true });
    this.score();
  }

  isStarted(){
    if (!this.state.started){
      this.setState({ started: true});
      let game = {};
      game.started = true;
      ApiUtil.updateGame(this.state.game.id, game)
    }
  }

  toggleMute(){
    var isMute = this.state.game.mute ? false : true;
    let game = {mute: isMute};
    ApiUtil.updateGame(this.state.game.id, game);
  }

  finalTime(time){
    this.setState({ time: time });
    let game = {};
    game.final_time = time;
    ApiUtil.updateGame(this.state.game.id, game);
  }

  score(){
    let marker = (this.state.game.level + 1) * 60;
    let bonus = (marker - this.state.time) >= 0 ? (marker - this.state.time) : 0;
    let extraTries = this.state.tries - (this.state.pics.length / 2);
    let score = ((bonus * 2) + 10) - extraTries;
    if (score < 0){
      score = 0;
    }
    this.setState({ score: score });
    if ((this.notGuest()) && (score > this.state.user.high_score)){
      let user = {high_score: score};
      ApiUtil.updateUser(this.state.user.id, user);
    }
  }

  tried(){
    let tries = this.state.tries + 1
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

  notGuest(){
    return (this.state.user && this.state.user.user_name !== "guest");
  }

  playSound(sound){
    if (!this.state.game.mute){
      let audio = new Audio(`assets/${sound}`);
      audio.play();
    }
  }

  render(){
    let {game, pics, won, started, time, score, tries, user} = this.state;
    if (this.notGuest()){ var highScore = user.high_score; }
    if (game && pics.length > 0){
      let muteIcon = game.mute ? "fa fa-volume-up fa-lg" : "fa fa-volume-off fa-lg";
      let wonStatus = won ? true : false;
      var timer;
      if (!started){
        timer = <h1>Pick a card...</h1>
      }
      else if (won){
        timer = <h1>Done!</h1>
      }
      else {
        timer = <Timer won={won} finalTime={this.finalTime}/>
      }
      return (
        <div id="game">
          <section>
            <h1>Tries: {tries}</h1>
            {timer}
            <h1 onClick={this.toggleMute}><i className={muteIcon}></i></h1>
          </section>
          <CardIndex playSound={this.playSound} mute={this.state.mute} pics={this.state.pics} theme={this.state.game.theme} gameId={this.state.game.id} isWon={this.isWon} isStarted={this.isStarted} tried={this.tried} />
          <Won won={wonStatus} highScore={highScore} score={this.state.score} gameId={this.state.game.id} name={user.name} />
        </div>
      )
    }
    else {
      return <div id="game"><div id="placeholder" onClick={this.clearGame}><h1>New Game</h1></div></div>
    }
  }

}

Game.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Game
