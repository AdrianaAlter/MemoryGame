import React from 'react'
import ApiUtil from '../util/apiUtil';

class Card extends React.Component {
  select() {
    if (this.props.status !== "matched"){
      this.props.selectCard(this.props.card.id);
    }
  }
  render() {
    return <li className={"card " + this.props.theme + " " + this.props.status} onClick={this.select.bind(this)}>{this.props.card.picture}</li>
  }
}

export default Card
