import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import loading from './loading'
import login from './sample'

const appReducer = history => combineReducers({
  router: connectRouter(history),
  loading,
  login
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
