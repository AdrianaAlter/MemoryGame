import React from 'react'
import ApiUtil from '../util/apiUtil.js'

class LogIn extends React.Component {

  constructor(){
    super();
    this.state = {user_name: "", password: "", display: "button"};
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
  }

  toggleDisplay(){
    this.state.display == "button" ? this.setState({ display: "form" }) : this.setState({ display: "button" });
  }

  updateName(e){
    this.setState({user_name: e.currentTarget.value});
  }

  updatePassword(e){
    this.setState({password: e.currentTarget.value});
  }

  submitInfo(e){
    e.preventDefault();
    var router = this.context.router;
    ApiUtil.logIn(this.state, function () {
      router.push("/");
    });
    this.toggleDisplay();
  }

  render(){
    if (this.state.display == "button"){
      return <form onClick={this.toggleDisplay}><h1>Log In</h1></form>
    }
    else {
      return(
        <form>
          <h2>Log In</h2>
          <section>
            <label>User Name</label>
            <input type="text" placeholder="User Name" onChange={this.updateName}></input>
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
}

LogIn.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default LogIn;
