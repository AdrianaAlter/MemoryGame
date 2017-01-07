import React from 'react'
import Game from './game.jsx'
import Setup from './setup.jsx'
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
  // newGame: function(e){
  //   var level = e.currentTarget.innerHTML;
  //   this.setState({ level: level })
  //   ApiUtil.createGame(level, this.state.user.id);
  // },
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
        <button onClick={this.logOut}>Log Out</button>
        <Setup userId={this.state.user.id} />
        {this.props.children}
      </div>
    )
  }
});

export default App
