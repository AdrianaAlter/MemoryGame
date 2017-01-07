import React from 'react'
import ApiUtil from '../util/apiUtil'

var Guest = React.createClass({
  contextTypes: { router: React.PropTypes.object.isRequired },

  getInitialState: function(){
    return { user_name: "guest", password: "guest", modalIsOpen: false };
  },

  handleSubmit: function (e) {
   e.preventDefault();
   var router = this.context.router;
   ApiUtil.signUp(this.state, function(){
     router.push("/");
   });
  },
  render: function(){
    return(
        <form id="guest" onClick={this.handleSubmit}>
          <h1>Play as Guest</h1>
          <p>Sign up to save games, track your high scores, and appear on leaderboards!</p>
        </form>
    )
  }

});

export default Guest;
