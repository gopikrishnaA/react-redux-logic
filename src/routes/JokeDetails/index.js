import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { updateJoke } from '../../actions'

import '../Login/App.css'

class Pure extends Component {
  render () {
    const {
      id,
      joke,
      navigate,
      like
    } = this.props
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 data-qa='header' className='App-title'>{joke}</h1>
          <div className='App-button' >
            <button onClick={() => like({ id, joke, status: 'Like' })}>Like</button>
            <button onClick={() => like({ id, joke, status: 'Unlike' })}>Unlike</button>
            <button onClick={() => navigate()} >Summary</button>
          </div>
        </header>
      </div>
    )
  }
}

const state = ({ login }) => ({
  joke: login.joke,
  id: login.id
})

const dispatch = (dispatch) => ({
  like: ({ id, joke, status, route }) => dispatch(updateJoke({ id, joke, status, route: 'login' })),
  navigate: () => dispatch(push('/summary'))
})

export const JokeDetails = connect(state, dispatch)(Pure)
