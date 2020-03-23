import { createReducer } from 'redux-act'
import {onSucessAction } from '../actions'

/** --------------------------------------------------
*
* Reducers
*
*/
export const sampleReducer = {
  [onSucessAction]: (state, payload) => ({
    ...state,
    ...payload
  })
}

const sampleInitialState = {
  joke: 'Loading ....',
  id: '',
  items: []
}

export default createReducer(sampleReducer, sampleInitialState)
