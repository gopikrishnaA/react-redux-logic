import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchJokeData, updateJoke } from '../../actions'
import './App.css'
class Pure extends Component {
  componentDidMount () {
    this.props.fetchJoke()
  }
  render () {
    const {
      id,
      joke,
      statusUpdate = () => {},
      navigate = () => {}
    } = this.props
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>{joke}</h1>
          <div className='App-button' >
            <button data-qa='like' onClick={() => statusUpdate({ id, joke, status: 'Like' })}>Like</button>
            <button data-qa='unlike' onClick={() => statusUpdate({ id, joke, status: 'Unlike' })}>Unlike</button>
            <button data-qa='summary' onClick={() => navigate()} >Summary</button>
            <button data-qa='refresh'  onClick={() => statusUpdate({ id, joke, status: 'New' })} >Refresh</button>
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
  fetchJoke: () => dispatch(fetchJokeData()),
  statusUpdate: ({ id, joke, status }) => dispatch(updateJoke({ id, joke, status })),
  navigate: () => dispatch(push('/summary'))
})

Pure.propTypes = {
  joke: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

export const LoginPage = connect(state, dispatch)(Pure)
