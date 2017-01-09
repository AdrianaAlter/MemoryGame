import React from 'react'
import Footer from './footer.jsx'
import Setup from './setup.jsx'
import Game from './game.jsx'
import ApiUtil from '../util/apiUtil'
import SessionStore from '../stores/sessionStore'
import UserStore from '../stores/userStore'

class App extends React.Component {
  constructor(){
    super();
    this.state = { user: this.getStateFromStore() };
  }
  getStateFromStore(){
    ApiUtil.fetchCurrentUser();
    return SessionStore.currentUser();
  }
  componentDidMount(){
    this.listener = UserStore.addListener(this._onChange);
  }
  componentWillUnmount(){
    this.listener.remove();
  }
  logOut(){
    ApiUtil.logOut();
    this.context.router.push("/login");
  }
  render(){
    return (
      <div>
        <Setup userId={this.state.user.id} />
        <Footer logOut={this.logOut.bind(this)} />
        {this.props.children}
      </div>
    )
  }
}
App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default App
