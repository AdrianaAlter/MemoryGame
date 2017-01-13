import React from 'react'
import Modal from 'react-modal'
import ApiUtil from '../util/apiUtil'

class Won extends React.Component{
  constructor(){
    super();
    this.state = { open: true };
    this.toggle = this.toggle.bind(this);
    this.clearGame = this.clearGame.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  clearGame(){
    this.toggle();
    ApiUtil.deleteGame(this.props.gameId);
    this.context.router.push("/");
  }

  toggle(){
    this.state.open ? this.setState({ open: false }) : this.setState({ open: true });
  }

  render(){
    var style;
    if (!this.state.open){
      style = {
        overlay : {
          display: 'none'
        },
        content : {
          display: 'none'
        }
      };
    }
    else {
      style = {
          overlay : {
            backgroundColor: '(105, 105, 105, 0.8)'
          },
          content : {
            background: 'blanchedalmond',
            boxShadow: '.25vw .25vw .3vw darkslategray, -.1vw -.1vw .1vw darkslategray',
            width: '50%',
            height: '60%',
            margin: 'auto',
            borderColor: 'transparent',
            borderRadius: '2%'
          }
        };
    }
    var highScore;
    if (this.props.highScore && this.props.score > this.props.highScore){
      highScore = <h3>Congratulations!  You have a new high score.</h3>;
    }
    else if (this.props.highScore){
      highScore = <h3>Your high score is {this.props.highScore}.</h3>;
    }
    else if (this.props.name === "guest"){
      highScore = <h3>To track your high score, sign up or log in!</h3>;
    }
    return (
      <div>
        <Modal style={style} contentLabel="Modal" className={this.state.display} isOpen={this.props.won}>
          <section id="won">
            <h1>You won!</h1>
            <h2>Score: {this.props.score}</h2>
            {highScore}
            <section>
              <button onClick={this.clearGame}>Play Again</button>
              <button onClick={this.toggle}>Ok</button>
            </section>
          </section>
        </Modal>
      </div>
    )
  }
}

Won.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Won;
