import React from 'react'
import Game from './game.jsx'
import ApiUtil from '../util/apiUtil'
import SessionStore from '../stores/sessionStore'
import UserStore from '../stores/userStore'

var App = React.createClass({
  getInitialState: function(){
    return { level: "", user: this.getStateFromStore() }
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
  newGame: function(e){
    var level = e.currentTarget.innerHTML;
    this.setState({ level: level })
    ApiUtil.createGame(level, this.state.user.id);
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
        <h1>APP</h1>
        <button onClick={this.logOut}>Log Out</button>
        <button onClick={this.newGame}>0</button>
        <button onClick={this.newGame}>1</button>
        <Game />
        {this.props.children}
      </div>
    )
  }
});

export default App
