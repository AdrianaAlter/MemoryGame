import React from 'react'
import ApiUtil from '../util/apiUtil'
import UserStore from '../stores/userStore'
import GameStore from '../stores/gameStore'
import SessionStore from '../stores/sessionStore'

class Setup extends React.Component {

  constructor(){
    super();
    this.state = { user: SessionStore.currentUser(), game: GameStore.all() };
    this.newGame = this.newGame.bind(this);
    this.setLevel = this.setLevel.bind(this);
    // this.loadGame = this.loadGame.bind(this);
    this.updateGame = this.updateGame.bind(this);
  }

  componentDidMount(){
    // if (this.state.game){
    //   ApiUtil.loadUserInfo(this.state.user.id);
    // }

    this.listener1 = SessionStore.addListener(this._onChange.bind(this));
    this.listener2 = GameStore.addListener(this._onChange.bind(this));
  }

  componentWillUnmount(){
    this.listener1.remove();
    this.listener2.remove();
  }

  _onChange(){
    this.setState({ user: UserStore.current(), game: GameStore.all() });
  }

  setLevel(e){
    const levels = ["Easy", "Hard"];
    var level = levels.indexOf(e.currentTarget.children[0].innerText);
    // if (levels[level]){
    // if(!this.state.user.game){
      ApiUtil.getPictures(level);
      this.newGame(level);
    // }
    // else {
    //   ApiUtil.getPictures(levels[level]);
    //   this.updateGame(levels[level]);
    // }
    // }
    // this.loadGame();
  }

  updateGame(num){
    var game = {};
    var {level, started, won} = {level: num, started: false, won: false}
    ApiUtil.updateGame(this.state.users.game.id, {level, started, won});

    // game.level = level;
    // game.started = false;
    // game.won = false;
    // ApiUtil.updateGame(this.state.users.game.id, game);
  }

  // loadGame(){
  //   debugger
  // }

  newGame(level){
    var game = {level: level, user_id: this.state.user.id};
    ApiUtil.createGame(game: game);
    this.context.router.push("/game");
  }

  render(){
    // if ((this.state.user) && (this.state.user.user_name !== "guest") && (this.state.user.games) && (this.state.user.games.length > 0) && (this.state.user.games.cards)){
    //   var saved = <button onClick={this.setLevel}><h2>Resume Saved Game</h2></button>;
    // }
    return (
      <div id="setup" className={this.state.display}>
        <h1>Choose your level to get started!</h1>
        <section className="group">
          <button onClick={this.setLevel}><h2>Easy</h2></button>
          <button onClick={this.setLevel}><h2>Hard</h2></button>
        </section>
      </div>
    )
  }

}

Setup.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Setup
