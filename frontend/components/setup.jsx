import React from 'react'
import Link from 'react-router'
import Game from './game'
import ApiUtil from '../util/apiUtil'
import UserStore from '../stores/userStore'
import GameStore from '../stores/gameStore'
import CardStore from '../stores/cardStore'
import SessionStore from '../stores/sessionStore'
import Modal from 'react-modal'

class Setup extends React.Component {
  constructor(){
    super();
    this.state = { user: SessionStore.currentUser(), game: GameStore.all() };
    this.newGame = this.newGame.bind(this);
    this.setLevel = this.setLevel.bind(this);
    this.loadGame = this.loadGame.bind(this);
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
    var levels = {
      "Easy": 0,
      "Hard": 1
    };
    var level = e.currentTarget.children[0].innerHTML;

    // if (levels[level]){
      ApiUtil.getPictures(levels[level]);
      this.newGame(levels[level]);
    // }
    // this.loadGame();

  }
  loadGame(){
    debugger
  }
  newGame(level){
    var game = {};
    game.level = level;
    game.user_id = this.state.user.id;
    ApiUtil.createGame(game);
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
export default Setup;
