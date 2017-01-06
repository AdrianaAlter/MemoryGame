import React from 'react'
import ApiUtil from '../util/apiUtil'

var SignUp = React.createClass({
  contextTypes: { router: React.PropTypes.object.isRequired },

  getInitialState: function(){
    return { user_name: "", password: "", modalIsOpen: false };
  },
  updateName: function(e){
    this.setState({user_name: e.currentTarget.value});
  },
  updatePassword: function(e){
    this.setState({password: e.currentTarget.value});
  },

  handleSubmit: function (e) {
   e.preventDefault();
   var router = this.context.router;
   ApiUtil.signUp(this.state, function () {
     router.push("/");
   });
  },
  render: function(){
    return(
          <form>
            <h1>Sign Up</h1>
            <label>User Name</label>
            <input type="text" onChange={this.updateName}></input>
            <label>Password</label>
            <input type="password" onChange={this.updatePassword}></input>
            <section className="welcome-buttons">
              <button className="left" onClick={this.handleSubmit}>Submit</button>
            </section>
          </form>
    )
  }

});

export default SignUp;
