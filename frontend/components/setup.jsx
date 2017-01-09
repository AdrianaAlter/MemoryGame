import React from 'react'
import Link from 'react-router'
import Game from './game'
import ApiUtil from '../util/apiUtil'
import UserStore from '../stores/userStore'
import GameStore from '../stores/gameStore'

class Setup extends React.Component {
  constructor(){
    super();
    this.state = { display: "shown", user: UserStore.current() };
    this.newGame = this.newGame.bind(this);
    this.loadGame = this.loadGame.bind(this);
  }
  componentDidMount(){
    this.listener = UserStore.addListener(this._onChange.bind(this));
    if ((this.state.user) && (this.state.user.user_name !== "guest")){
      ApiUtil.loadUserInfo(this.state.user.id);
    }
  }
  componentWillUnmount(){
    this.listener.remove();
  }
  _onChange(){
    this.setState({ user: UserStore.current() });
  }
  newGame(e){
    var levels = {
      "Easy": 0,
      "Hard": 1
    };
    var level = e.currentTarget.children[0].innerHTML;
    ApiUtil.createGame(levels[level], this.props.userId);
    this.setState({ display: "hidden" });
    this.context.router.push("/");
  }
  loadGame(){
    ApiUtil.fetchGame(this.state.user.games[0].id);
  }
  render(){
    if ((this.state.user) && (this.state.user.user_name !== "guest") && (this.state.user.games)){
      var saved = <button onClick={this.loadGame}>Resume Saved Game</button>;
    }
    return (
      <div id="setup" className={this.state.display}>
        <h1>Choose your level to get started!</h1>
        <section className="group">
          <button onClick={this.newGame}><h2>Easy</h2></button>
          <button onClick={this.newGame}><h2>Hard</h2></button>
        </section>
      </div>
    )
  }

}
Setup.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default Setup;
