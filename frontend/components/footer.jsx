import React from 'react'

var Footer = React.createClass({

  render: function(){
    return (
      <footer>
        <button onClick={this.props.logOut}>Log Out</button>
        <button>Leaderboards</button>
        <button>New Game</button>
      </footer>
    )
  }

});

export default Footer
