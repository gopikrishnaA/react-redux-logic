import { createReducer } from 'redux-act'
import {onSuccess, onSucessAction } from '../actions'

/** --------------------------------------------------
*
* Reducers
*
*/
export const sampleReducer = {
  [onSucessAction]: (state, payload) => ({
    ...state,
    ...payload
  }),
  [onSuccess]: (state, payload) => {
    return {
      ...state,
      items: {
        ...state.items,
        [payload.id]: {
          joke: payload.joke,
          status: payload.status,
          timeStamp: new Date().toLocaleString()
        }
      }
    }
  }
}

const sampleInitialState = {
  joke: 'Loading ....',
  id: '',
  items: {}
}

export default createReducer(sampleReducer, sampleInitialState)
