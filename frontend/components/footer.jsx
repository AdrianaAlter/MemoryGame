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
    // GameStore.clear();
    // if (this.state.game && !this.state.game.saved){
    this.clearGame();
    // }
    ApiUtil.logOut();
    this.context.router.push("/login");
  }

  clearGame(){
    if (this.context.router.location.pathname !== "/"){
      if (this.state.game){
        ApiUtil.deleteGame(this.state.game.id);
      }
      else {
        this.context.router.push("/");
      }
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
    var changed = new Audio('assets/changed.ogg');
    changed.play();
    var game = {};
    game.theme = e.currentTarget.innerText.toLowerCase().split(" ").join("");
    ApiUtil.updateGame(this.state.game.id, game);
  }

  render(){
    if (this.state.user){
      var buttonText = this.state.user.user_name == "guest" ? "Sign Up" : "Log Out";
      var save = this.state.user.user_name == "guest" ? null : <button onClick={this.saveGame}>Save Game</button>;
      var welcome = this.state.user.user_name == "guest" ? null : <button id="name-display">Welcome, {this.state.user.user_name}!</button>
    }
    if (this.state.game){
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
