import React from 'react'
import ApiUtil from '../util/apiUtil'

class Guest extends React.Component {

  constructor(){
    super();
    this.state = { user_name: "guest", password: "guest" };
    this.submitInfo = this.submitInfo.bind(this);
  }

  submitInfo(){
   var router = this.context.router;
   ApiUtil.logIn(this.state, function(){
     router.push("/");
   });
  }

  render(){
    return(
        <form id="guest" onClick={this.submitInfo}>
          <h1>Play as Guest</h1>
          <p>Sign up to track your high scores and appear on leaderboards!</p>
        </form>
    )
  }

}

Guest.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Guest
