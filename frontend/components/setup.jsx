import React from 'react'
import ApiUtil from '../util/apiUtil'
import UserStore from '../stores/userStore'
import GameStore from '../stores/gameStore'
import SessionStore from '../stores/sessionStore'
const PICS = {
  0: [ "♉", "♘", "♉", "♫", "♫", "✨", "♘", "✨" ],
  1: ["❅", "⚔", "♘", "♉", "⚛", "♖", "✨", "❅", "♫", "♫", "⚛", "✨", "♉", "⚔", "♖", "♘"]
};
class Setup extends React.Component {

  constructor(){
    super();
    this.state = { user: SessionStore.currentUser(), game: GameStore.all() };
    this.newGame = this.newGame.bind(this);
    this.setLevel = this.setLevel.bind(this);
    this.updateGame = this.updateGame.bind(this);
  }

  componentDidMount(){
    this.listener1 = SessionStore.addListener(this._onChange.bind(this));
    this.listener2 = GameStore.addListener(this._onChange.bind(this));
  }

  componentWillUnmount(){
    this.listener1.remove();
    this.listener2.remove();
  }

  _onChange(){
    this.setState({ user: SessionStore.currentUser(), game: GameStore.all() });
  }

  setLevel(e){
    const levels = ["Easy", "Hard"];
    var level = levels.indexOf(e.currentTarget.children[0].innerText);
    debugger
    ApiUtil.getPictures(PICS[level]);
    this.newGame(level);
  }

  updateGame(num){
    var game = {};
    var {level, started, won} = {level: num, started: false, won: false}
    ApiUtil.updateGame(this.state.users.game.id, {level, started, won});
  }

  newGame(level){
    var game = {level: level, user_id: this.state.user.id};
    ApiUtil.createGame(game: game);
    this.context.router.push("/game");
  }

  render(){
    return (
      <div id="setup" className={this.state.display}>
        <h1>Choose a level to get started!</h1>
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
