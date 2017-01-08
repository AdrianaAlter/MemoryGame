import React from 'react'

class Footer extends React.Component {

  render(){
    return (
      <footer>
        <button onClick={this.props.logOut}>Log Out</button>
        <button>Leaderboards</button>
        <button>New Game</button>
      </footer>
    )
  }

}

export default Footer
