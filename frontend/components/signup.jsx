import React from 'react'
import ApiUtil from '../util/apiUtil'

class SignUp extends React.Component {

  constructor(){
    super();
    this.state = {user_name: "", password: "", display: "button", warning: false};
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
   const router = this.context.router;
   ApiUtil.signUp(this.state, function () {
     router.push("/");
   });
   this.toggleDisplay();
  }

  render(){
    let warning = this.state.blank ? "warning" : "";
    if (this.state.display == "button"){
      return <form onClick={this.toggleDisplay}><h1>Sign Up</h1></form>
    }
    else {
      return(
        <form>
          <h2>Sign Up</h2>
          <input type="text" className={warning} placeholder="User Name" onChange={this.updateName}></input>
          <input type="password" className={warning} placeholder="Password" onChange={this.updatePassword}></input>
          <section>
            <button onClick={this.checkBlank}>Submit</button>
            <button onClick={this.toggleDisplay}>Cancel</button>
          </section>
        </form>
      )
    }
  }

}

SignUp.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SignUp
