import React from 'react'
import ApiUtil from '../util/apiUtil'
import GameStore from '../stores/gameStore'
import UserStore from '../stores/userStore'
import SessionStore from '../stores/sessionStore'
import Leaderboard from './leaderboard'
import Menu from './menu'

class Footer extends React.Component {

  constructor(){
    super();
    this.state = { game: GameStore.all(), user: SessionStore.currentUser(), menu: "hidden" };
    this.clearGame = this.clearGame.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.setTheme = this.setTheme.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount(){
    ApiUtil.fetchCurrentUser();
    this.listener1 = GameStore.addListener(this._onChange.bind(this));
    this.listener2 = SessionStore.addListener(this._onChange.bind(this));
  }

  componentWillUnmount(){
    this.listener1.remove();
    this.listener2.remove();
  }

  _onChange(){
    this.setState({ game: GameStore.all(), user: SessionStore.currentUser() });
  }

  logOut(){
    if (this.state.game){
      ApiUtil.deleteGame(this.state.game.id);
      ApiUtil.logOut();
    }
    else {
      this.context.router.push("/login");
    }
  }

  clearGame(){
    if (this.context.router.location.pathname !== "/"){
      this.state.game ? ApiUtil.deleteGame(this.state.game.id) : this.context.router.push("/");
    }
  }

  saveGame(){
    var game = {};
    game.saved = true;
    ApiUtil.updateGame(this.state.game.id, game);
  }

  openMenu(){
    this.setState({ menu: "menu" });
  }

  closeMenu(){
    this.setState({ menu: "hidden" });
  }

  setTheme(e){
    if (!this.state.game.mute){
      var changed = new Audio('assets/changed.ogg');
      changed.play();
    }
    var game = {};
    game.theme = e.currentTarget.innerText.toLowerCase().split(" ").join("");
    ApiUtil.updateGame(this.state.game.id, game);
  }

  render(){
    let {game, user} = this.state;
    if (user){
      var buttonText = user.user_name == "guest" ? "Sign Up" : "Log Out";
      var save = user.user_name == "guest" ? null : <button onClick={this.saveGame}>Save Game</button>;
      var welcome = user.user_name == "guest" ? null : <button id="name-display">Welcome, {user.user_name}!</button>
    }
    if (game){
      var menu = <Menu setTheme={this.setTheme} openMenu={this.openMenu} closeMenu={this.closeMenu} display={this.state.menu} />;
    }
    return (
      <footer>
        <button onClick={this.logOut}>{buttonText}</button>
        <Leaderboard />
        <button onClick={this.clearGame}>New Game</button>
        {menu}
        {welcome}
      </footer>
    )
  }

}

Footer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Footer
