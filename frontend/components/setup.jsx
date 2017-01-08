import React from 'react'
import Link from 'react-router'
import Game from './game'
import ApiUtil from '../util/apiUtil'

class Setup extends React.Component {
  constructor(){
    super();
    this.state = { display: "shown" };
    this.newGame = this.newGame.bind(this);
  }
  contextTypes: {
    router: React.PropTypes.object.isRequired
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
    return (
      <div id="setup" className={this.state.display}>
        <h1>Choose your level to get started!</h1>
        <section className="group">
          <button onClick={this.newGame}><h2>Beginner</h2></button>
          <button onClick={this.newGame}><h2>Intermediate</h2></button>
          <button onClick={this.newGame}><h2>Advanced</h2></button>
        </section>
      </div>
    )
  }

}

export default Setup;
