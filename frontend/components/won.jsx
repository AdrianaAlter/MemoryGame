import React from 'react'
import ApiUtil from '../util/apiUtil'

class Won extends React.Component{
  clearGame(){
    ApiUtil.deleteGame(this.props.gameId);
  }
  render(){
    var highScore;
    if (this.props.highScore && this.props.score > this.props.highScore){
      highScore = <h3>Congratulations!  You have a new high score.</h3>;
    }
    else if (this.props.highScore){
      highScore = <h3>Your high score is {this.props.highScore}.</h3>;
    }
    else {
      highScore = <h3>To track your high score, sign up or log in!</h3>;
    }
    return (
      <div id="won" className={this.props.className}>
        <section>
          <h1>You won!</h1>
          <h2>Score: {this.props.score}</h2>
          {highScore}
          <button onClick={this.clearGame.bind(this)}>Play Again</button>
        </section>
      </div>
    )
  }
}

export default Won;
