import React from 'react'
import Guest from './guest'
import LogIn from './login'
import SignUp from './signup'

class Welcome extends React.Component {
  render(){
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
}

export default Welcome
