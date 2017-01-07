import React from 'react'
import Game from './game'

var Setup = React.createClass({

  LEVELS: {
    "Beginner": 0,
    "Intermediate": 1,
    "Advanced": 2
  },

  newGame: function(e){
    var level = e.currentTarget.innerHTML;
    ApiUtil.createGame(LEVELS[level], this.props.userId);
  },

  render: function(){
    return (
      <div id="setup">
        <h1>Choose your level to get started!</h1>
        <section className="group">
          <button onClick={this.newGame}><h2>Beginner</h2></button>
          <button onClick={this.newGame}><h2>Intermediate</h2></button>
          <button onClick={this.newGame}><h2>Advanced</h2></button>
        </section>
      </div>
    )
  }

});

export default Setup;
