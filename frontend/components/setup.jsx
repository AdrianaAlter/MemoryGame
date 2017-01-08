import React from 'react'
import Link from 'react-router'
import Game from './game'
import ApiUtil from '../util/apiUtil'
import UserStore from '../stores/userStore'

class Setup extends React.Component {
  constructor(){
    super();
    this.state = { display: "shown", user: UserStore.current() };
    this.newGame = this.newGame.bind(this);
  }
  componentDidMount(){
    this.listener = UserStore.addListener(this._onChange.bind(this));
  }
  componentWillUnmount(){
    this.listener.remove();
  }
  _onChange(){
    this.setState({ user: UserStore.current() });
  }
  newGame(e){
    var levels = {
      "Beginner": 0,
      "Intermediate": 1,
      "Advanced": 2
    };
    var level = e.currentTarget.children[0].innerHTML;
    ApiUtil.createGame(levels[level], this.props.userId);
    this.setState({ display: "hidden" });
    this.context.router.push("/");
  }
  render(){
    if ((this.state.user.user_name !== "guest") && (this.state.user.games)){
      var saved = <button>Resume Saved Game</button>;
    }
    return (
      <div id="setup" className={this.state.display}>
        <h1>Choose your level to get started!</h1>
        <section className="group">
          <button onClick={this.newGame}><h2>Beginner</h2></button>
          <button onClick={this.newGame}><h2>Intermediate</h2></button>
          {saved}
        </section>
      </div>
    )
  }

}
Setup.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default Setup;
