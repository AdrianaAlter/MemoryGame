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
    var style = {
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
    var scoreNums = Object.keys(this.state.scores).sort().reverse();
    var scores = scoreNums.map(function(score){
      if (self.state.scores[score] !== "guest"){
        return <li key={scoreNums.indexOf(score)}>{self.state.scores[score]}:   {score}</li>
      }
    });
    return (
      <button>
        <section onClick={this.toggle}>Leaderboard</section>
        <Modal contentLabel="Modal" style={style} isOpen={this.state.modalIsOpen} onRequestClose={this.toggle}>
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
