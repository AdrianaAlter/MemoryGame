import React from 'react'
import ApiUtil from '../util/apiUtil'

var SignUp = React.createClass({
  contextTypes: { router: React.PropTypes.object.isRequired },

  getInitialState: function(){
    return { user_name: "", password: "", display: "button" };
  },
  toggleDisplay: function(){
    this.state.display == "button" ? this.setState({ display: "form" }) : this.setState({ display: "button" });
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
   this.toggleDisplay();
  },
  render: function(){
    if (this.state.display == "button"){
      return <form onClick={this.toggleDisplay}><h1>Sign Up</h1></form>
    }
    else {
      return(
        <form>
          <h2>Sign Up</h2>
            <section>
              <label>User Name</label>
              <input type="text" onChange={this.updateName}></input>
            </section>
            <section>
              <label>Password</label>
              <input type="password" onChange={this.updatePassword}></input>
            </section>
            <section>
              <button onClick={this.submitInfo}>Submit</button>
              <button onClick={this.toggleDisplay}>Cancel</button>
            </section>
        </form>
      )
    }
  }
});

export default SignUp;
