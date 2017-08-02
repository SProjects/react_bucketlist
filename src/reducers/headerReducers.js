import {Map} from 'immutable';
import * as actionTypes from "../constants";

const INITIAL_STATE = Map({
    user: Map({
        id: null,
        first_name: '',
        last_name: '',
        email: '',
        bucketlist_url: '',
    })
});

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.CURRENT_USER_REQUEST:
            return state;
        case actionTypes.CURRENT_USER_FETCHED: {
            return state.merge(Map({
                user: action.payload,
            }))
        }
        case actionTypes.CURRENT_USER_FETCHED_FAILED: {
            return state.merge(Map({
                error: action.error
            }))
        }
        default: {
            return state;
        }
    }
}