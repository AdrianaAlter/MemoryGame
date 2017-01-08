import React from 'react'
import ApiUtil from '../util/apiUtil'

class Guest extends React.Component {
  constructor(props, context){
    super(props);
    context.router;
    this.state = { user_name: "guest", password: "guest" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
   e.preventDefault();
   var router = this.context.router;
   ApiUtil.signUp(this.state, function(){
     router.push("/");
   });
  }

  render(){
    return(
        <form id="guest" onClick={this.handleSubmit}>
          <h1>Play as Guest</h1>
          <p>Sign up to save games, track your high scores, and appear on leaderboards!</p>
        </form>
    )
  }

}
Guest.contextTypes = {
  router: React.PropTypes.func.isRequired
}

export default Guest;
