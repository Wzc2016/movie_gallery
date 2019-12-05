import React, { Component } from 'react'
import { Menu, Segment, Input } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory';

const history = createHistory({forceRefresh:true});   


class Header extends Component {

  constructor() {
    super();

    this.state = {
      value: ''
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.keyPressHandler = this.keyPressHandler.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
  }

  inputChangeHandler(e) {
    this.setState({ value: e.target.value});
  }

  keyPressHandler(e) {
    if(e.key != 'Enter'){
      return;
    }
    history.push(process.env.PUBLIC_URL + "/Movies/Search/" + this.state.value)
  }

  state = { activeItem: 'home' }


  handleHomeClick() {
    history.push(process.env.PUBLIC_URL + "/Movies/Gallery")
  }

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted>
        <Menu inverted secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleHomeClick}
          />
          <Menu.Item position='right'>
            <Input
              action={{ type: 'submit', content: 'Go', onClick: () => {history.push(process.env.PUBLIC_URL + "/Movies/Search/" + this.state.value);} }}
              placeholder='Key word here!'
              onKeyPress={this.keyPressHandler.bind(this)}
              onChange={this.inputChangeHandler.bind(this)}
            />
          </Menu.Item>
        </Menu>
      </Segment>
    )
  }
}

export default withRouter(Header);