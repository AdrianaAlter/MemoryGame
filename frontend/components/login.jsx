import React from 'react'
import ApiUtil from '../util/apiUtil.js'

var LogIn = React.createClass({

  contextTypes: { router: React.PropTypes.object.isRequired },

  getInitialState: function(){
    return {user_name: "", password: ""};
  },

  updateName: function(e){
    this.setState({user_name: e.currentTarget.value});
  },

  updatePassword: function(e){
    this.setState({password: e.currentTarget.value});
  },

  submitInfo: function(e){
    e.preventDefault();
    var router = this.context.router;
    ApiUtil.logIn(this.state, function () {
      router.push("/");
    });
  },

  render: function(){

    return(
          <form>
            <h1>Log In</h1>
            <label>User Name</label>
            <input type="text" onChange={this.updateName}></input>
            <label>Password</label>
            <input type="password" onChange={this.updatePassword}></input>
            <button onClick={this.submitInfo}>Submit</button>
          </form>
    )
  }

});


export default LogIn;
