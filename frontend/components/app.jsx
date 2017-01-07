import React from 'react'
import Footer from './footer.jsx'
import Setup from './setup.jsx'
import Game from './game.jsx'
import ApiUtil from '../util/apiUtil'
import SessionStore from '../stores/sessionStore'
import UserStore from '../stores/userStore'

var App = React.createClass({
  getInitialState: function(){
    return { user: this.getStateFromStore() }
  },
  getStateFromStore: function(){
    ApiUtil.fetchCurrentUser();
    return SessionStore.currentUser();
  },
  componentDidMount: function(){
    this.listener = UserStore.addListener(this._onChange);
  },
  componentWillUnmount: function(){
    this.listener.remove();
  },
  contextTypes: {
		router: React.PropTypes.object.isRequired
	},
  logOut: function () {
    ApiUtil.logOut();
    this.context.router.push("/login");
  },
  render: function(){
    return (
      <div>
        <Setup userId={this.state.user.id} />
        <Footer logOut={this.logOut} />
        {this.props.children}
      </div>
    )
  }
});

export default App
