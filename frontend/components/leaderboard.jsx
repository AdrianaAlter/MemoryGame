import React from 'react'
import Modal from 'react-modal'
import ApiUtil from '../util/apiUtil'
import UserStore from '../stores/userStore'

class Leaderboard extends React.Component {

  constructor(){
    super();
    this.state = { modalIsOpen: false, scores: UserStore.highScores() };
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount(){
    Modal.setAppElement('body');
  }

  componentDidMount(){
    ApiUtil.fetchAllUsers();
    this.listener = UserStore.addListener(this._onChange.bind(this));
  }

  componentWillUnmount(){
    this.listener.remove();
  }

  _onChange(){
    this.setState({ scores: UserStore.highScores() });
  }

  toggle(){
    this.state.modalIsOpen ? this.setState({ modalIsOpen: false }) : this.setState({ modalIsOpen: true });
  }

  render(){
    const style = {
      overlay : {
        backgroundColor: '(105, 105, 105, 0.8)'
      },
      content : {
        background: 'blanchedalmond',
        boxShadow: '.25vw .25vw .3vw darkslategray, -.1vw -.1vw .1vw darkslategray',
        margin: 'auto',
        width: '40%',
        borderColor: 'transparent',
        borderRadius: '2%'
      }
    };
    var scores = this.state.scores.map(({name, score}) => {
      let idx = this.state.scores.findIndex(x => x.name === name);
      return <li key={idx}>{name}:   {score}</li>;
    });
    return (
      <button>
        <section onClick={this.toggle}>Leaderboard</section>
        <Modal contentLabel="Modal" style={style} isOpen={this.state.modalIsOpen}>
          <div id="leaderboard" className="group">
            <h1>High Scores</h1>
            <ul>
              {scores}
            </ul>
            <button onClick={this.toggle}>Ok</button>
          </div>
        </Modal>
      </button>
    )
  }

}

export default Leaderboard
