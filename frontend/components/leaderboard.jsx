import React from 'react'
import Modal from 'react-modal'
import ApiUtil from '../util/apiUtil'
import UserStore from '../stores/userStore'

class Leaderboard extends React.Component {
  constructor(){
    super();
    this.state = { modalIsOpen: true, scores: UserStore.highScores() };
    this.toggle = this.toggle.bind(this);
  }
  componentWillMount() {
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
    var self = this;
    var scoreNums = Object.keys(this.state.scores).sort().reverse();
    var scores = scoreNums.map(function(score){
      return <li key={scoreNums.indexOf(score)}>{self.state.scores[score]}: {score}</li>
    });
    return (
      <div>
        <button onClick={this.toggle}>Leaderboard</button>
        <Modal contentLabel="Modal" isOpen={this.state.modalIsOpen} onRequestClose={this.toggle}>
          <div id="leaderboard" className="group">
            <h1>High Scores</h1>
            <ul>
              {scores}
            </ul>
            <button onClick={this.toggle}>Ok</button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Leaderboard
