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
        <button onClick={this.handleSubmit}>Play as Guest</button>
    )
  }

});

export default Guest;
