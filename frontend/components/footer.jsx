import React from 'react'
import ApiUtil from '../util/apiUtil'
import GameStore from '../stores/gameStore'
import CardStore from '../stores/cardStore'
import UserStore from '../stores/userStore'
import SessionStore from '../stores/sessionStore'
import Leaderboard from './leaderboard'

class Footer extends React.Component {
  constructor(){
    super();
    this.state = { game: GameStore.all(), user: UserStore.current(), menu: "menu" };
    this.clearGame = this.clearGame.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.setTheme = this.setTheme.bind(this);
  }
  componentDidMount(){
    this.listener1 = GameStore.addListener(this._onChange.bind(this));
    this.listener2 = UserStore.addListener(this._onChange.bind(this));
  }
  componentWillUnmount(){
    this.listener1.remove();
    this.listener2.remove();
  }
  _onChange(){
    this.setState({ game: GameStore.all(), user: UserStore.current() });
  }
  clearGame(){
    if (this.state.game[0]){
      ApiUtil.deleteGame(this.state.game[0].id);
    }
  }
  saveGame(){
    var cards = CardStore.all();
    var game = {};
    game.cards = cards;
    ApiUtil.updateGame(this.state.game[0].id);
  }
  openMenu(){
    this.setState({ menu: "menu" });
  }
  closeMenu(){
    this.setState({ menu: "hidden" });
  }
  setTheme(e){
    var game = {};
    game.theme = e.currentTarget.innerHTML.toLowerCase().split(" ").join("");
    ApiUtil.updateGame(this.state.game[0].id, game);
  }
  render(){
    if (this.state.user){
      var buttonText = this.state.user.user_name == "guest" ? "Sign Up" : "Log Out";
      var save = this.state.user.user_name == "guest" ? null : <button onClick={this.saveGame}>Save Game</button>;
    }
    if (this.state.game.length > 0){
      var customize =   (
        <button onMouseOver={this.openMenu} onMouseLeave={this.closeMenu}>Customize
          <ul className={this.state.menu}>
            <li onClick={this.setTheme}>Theme 1</li>
            <li onClick={this.setTheme}>Theme 2</li>
            <li onClick={this.setTheme}>Theme 3</li>
          </ul>
        </button>
      )
    }
    return (
      <footer>
        <button onClick={this.props.logOut}>{buttonText}</button>
        <Leaderboard />
        <button onClick={this.clearGame}>New Game</button>
        {customize}
      </footer>
    )
  }

}

export default Footer
