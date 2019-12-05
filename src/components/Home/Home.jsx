import React, { Component } from 'react'

import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { Home as HomeCss, HomeHeader } from './Home.module.scss'

class Home extends Component {
  render() {
    return (
      <div className={HomeCss}>
        <h1 className={HomeHeader}>Welcome to the Movie Gallery!</h1>

        <p>This a landing page for my app.</p>

        <Link to={process.env.PUBLIC_URL + "/Movies/Gallery"}>
          <Button>
            Enter
          </Button>
        </Link>
      </div>
    )
  }

}

export default Home