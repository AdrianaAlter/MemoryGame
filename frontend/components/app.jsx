import React from 'react'
import Footer from './footer.jsx'
import Setup from './setup.jsx'
import Game from './game.jsx'
import ApiUtil from '../util/apiUtil'
import SessionStore from '../stores/sessionStore'
import UserStore from '../stores/userStore'

class App extends React.Component {

  render(){
    return (
      <div>
        {this.props.children}
        <Footer />
      </div>
    )
  }
}


export default App
