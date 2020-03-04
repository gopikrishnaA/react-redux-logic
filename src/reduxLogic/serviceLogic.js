import { createLogic } from 'redux-logic'
import { DATA_FETCH, DATA_FETCH_CANCEL, onSucessAction, UPDATE_LIKE, onSuccess, fetchJokeData } from '../actions'
import invokeService from '../services'
import { push } from 'connected-react-router';

const fetchLogic = createLogic({
    type: DATA_FETCH, // only apply this logic to this type
    cancelType: DATA_FETCH_CANCEL, // cancel on this type
    latest: true, // only take latest
    process({ httpClient, getState, action }, dispatch, done) {

        invokeService({
            serviceUrl: 'https://icanhazdadjoke.com'
        })
            .then(result => dispatch(onSucessAction({
                id: result.id,
                joke: result.joke
            })))
            .catch(err => {
                console.error(err); // log since could be render err
                //    dispatch({ type: DATA_FETCH_CANCEL, payload: err,
                //               error: true })
            })
            .then(() => done());
    }
});

const updateLikes = createLogic({
    type: UPDATE_LIKE, // only apply this logic to this type
    process({ getState, action }, dispatch, done) {
        if (action.payload.route === 'login') {
            dispatch(onSuccess(action.payload))
            dispatch(push('/login'))
            done()
        } else {
            dispatch(fetchJokeData())
            dispatch(onSuccess(action.payload))
            done()            
        }
    }
});

export default [
    fetchLogic,
    updateLikes
]