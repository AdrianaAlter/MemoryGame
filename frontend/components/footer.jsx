import React from 'react'
import ApiUtil from '../util/apiUtil'
import GameStore from '../stores/gameStore'
import SessionStore from '../stores/sessionStore'
import Leaderboard from './leaderboard'

class Footer extends React.Component {
  constructor(){
    super();
    this.state = { game: GameStore.all(), user: SessionStore.currentUser() };
    this.clearGame = this.clearGame.bind(this);
    // this.saveGame = this.saveGame.bind(this);
  }
  componentDidMount(){
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
  clearGame(){
    if (this.state.game[0]){
      ApiUtil.deleteGame(this.state.game[0].id);
    }
  }
  // saveGame(){
  //   ApiUtil.updateGame(this.state.game[0].id, game);
  // }
  render(){
    var buttonText = this.state.user.user_name == "guest" ? "Sign Up" : "Log Out";
    var save = this.state.user.user_name == "guest" ? null : <button onClick={this.saveGame}>Save Game</button>;
    return (
      <footer>
        <button onClick={this.props.logOut}>{buttonText}</button>
        <Leaderboard />
        <button onClick={this.clearGame}>New Game</button>
        {save}
      </footer>
    )
  }

}

export default Footer
