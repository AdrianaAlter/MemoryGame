import React from 'react'
import ApiUtil from '../util/apiUtil.js'

class LogIn extends React.Component {

  constructor(){
    super();
    this.state = {user_name: "", password: "", display: "button", blank: false};
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
    this.checkBlank = this.checkBlank.bind(this);
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

  checkBlank(){
    if (!(this.state.user_name && this.state.password)){
      this.setState({ blank: true});
    }
    else {
      this.submitInfo();
    }
  }

  submitInfo(){
    var router = this.context.router;
    ApiUtil.logIn(this.state, function(){
      router.push("/");
    });
    this.toggleDisplay();
  }

  render(){
    let warning = this.state.blank ? "warning" : "";
    if (this.state.display == "button"){
      return <form onClick={this.toggleDisplay}><h1>Log In</h1></form>
    }
    else {
      return(
        <form>
          <h2>Log In</h2>
          <input className={warning} type="text" placeholder="User Name" onChange={this.updateName}></input>
          <input className={warning} type="password" placeholder="Password" onChange={this.updatePassword}></input>
          <section>
            <button onClick={this.checkBlank}>Submit</button>
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

export default LogIn
