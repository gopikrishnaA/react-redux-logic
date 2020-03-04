import { createAction } from 'redux-act'

// Actions
export const onLikeAction = createAction('LIKE_ACTION')

// Redux logic actions

export const DATA_FETCH = 'DATA_FETCH'
export const DATA_FETCH_CANCEL = 'DATA_FETCH_CANCEL'
export const fetchJokeData = createAction(DATA_FETCH)
export const onSucessAction = createAction('SAMPLE_ACTION_SUCCESS')

export const LIKE_ACTION = 'LIKE_ACTION'
export const UPDATE_LIKE = 'UPDATE_LIKE'
export const updateJoke = createAction(UPDATE_LIKE)
export const onSuccess = createAction('ON_SUCCESS')
