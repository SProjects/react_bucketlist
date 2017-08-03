import {Map, fromJS, List} from 'immutable';
import * as actionTypes from "../constants";

const INITIAL_STATE = Map({
    fetching: false,
    error: null,
    message: '',
    bucketlists: List(),
    previous: null,
    next: null,
    showCreate: false,
    closeCreate: true
});

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.BUCKETLISTS_REQUEST: {
            return state.merge(Map({
                fetching: true
            }))
        }
        case actionTypes.BUCKETLISTS_FETCHED: {
            return state.merge(Map({
                fetching: false,
                bucketlists: fromJS(action.payload.bucketlists),
                previous: action.payload.previous,
                next: action.payload.next
            }))
        }
        case actionTypes.BUCKETLISTS_FETCH_FAILED: {
            return state.merge(Map({
                fetching: false,
                error: action.error
            }))
        }
        case actionTypes.BUCKETLISTS_CREATE_REQUEST: {
            return state.merge(Map({
                showCreate: true,
                closeCreate: false
            }))
        }
        case actionTypes.BUCKETLISTS_CREATE_CLOSE: {
            return state.merge(Map({
                showCreate: false,
                closeCreate: true
            }))
        }
        case actionTypes.BUCKETLISTS_NEW_REQUEST: {
            return state;
        }
        case actionTypes.BUCKETLISTS_CREATED: {
            return state.merge(Map({
                message: action.message
            }))
        }
        case actionTypes.BUCKETLISTS_CREATE_FAILED: {
            return state.merge(Map({
                error: action.error
            }))
        }
        default: {
            return state;
        }
    }
}