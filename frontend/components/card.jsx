import React from 'react'
import ApiUtil from '../util/apiUtil';

var Card = React.createClass({
  select: function(){
    if (this.props.status !== "matched"){
      this.props.selectCard(this.props.card.id);
    }
  },
  render: function(){
    return <li className={"card " + this.props.status} onClick={this.select}>{this.props.card.picture}</li>
  }
})

export default Card
