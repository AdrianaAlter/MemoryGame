import React from 'react'
import Guest from './guest'
import LogIn from './login'
import SignUp from './signup'

var Welcome = React.createClass({
  render: function(){
    return (
      <div id="welcome">
        <Guest />
        <LogIn />
        <SignUp />
      </div>
    )
  }
});

export default Welcome
