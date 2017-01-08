import React from 'react'
import ApiUtil from '../util/apiUtil'

class Won extends React.Component{
  clearGame(){
    ApiUtil.deleteGame(this.props.gameId);
  }
  render(){
    var highScore = this.props.score > this.props.highScore ? <h3>Congratulations!  You have a new high score.</h3> : <h3>Your high score is {this.props.highScore}.</h3>;
    return (
      <section id="won" className={this.props.className}>
        <h1>You won!</h1>
        <h2>Score: {this.props.score}</h2>
        {highScore}
        <button onClick={this.clearGame.bind(this)}>Play Again</button>
      </section>
    )
  }
}

export default Won;
