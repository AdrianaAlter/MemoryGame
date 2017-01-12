import React from 'react'

class Card extends React.Component {

  select(){
    if (this.props.className.split(" ")[2] !== "matched"){
      this.props.selectCard(this.props.card.id);
    }
  }

  render(){
    return <li className={this.props.className} onClick={this.select.bind(this)}>{this.props.card.picture}</li>
  }

}

export default Card
