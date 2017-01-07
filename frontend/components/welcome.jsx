import React from 'react'
import Guest from './guest'
import LogIn from './login'
import SignUp from './signup'

var Welcome = React.createClass({
  render: function(){
    return (
      <div id="welcome">
        <h1>Welcome to Memory!</h1>
        <div>
          <section>
            <LogIn />
            <SignUp />
          </section>
          <Guest />
        </div>
      </div>
    )
  }
});

export default Welcome
