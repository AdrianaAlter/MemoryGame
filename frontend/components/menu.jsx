import React from 'react'

class Menu extends React.Component {

  render(){
    var themes = [1, 2, 3].map((num) => {
      return <li key={num} onClick={this.props.setTheme}>Theme {num}</li>
    });
    return (
      <button onMouseOver={this.props.openMenu} onMouseLeave={this.props.closeMenu}>Themes
        <ul className={this.props.display}>
          {themes}
        </ul>
      </button>
    )
  }

}

export default Menu
