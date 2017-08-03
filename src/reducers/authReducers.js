import {Map, fromJS} from 'immutable';
import * as actionTypes from "../constants";

const INITIAL_STATE = Map({
    isLoggedIn: false,
    fetching: false,
    error: null,
    credentials: Map({
        email: '',
        password: ''
    }),
    user: '',
    token: ''
});

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.LOGIN_USER:
            return state;
        case actionTypes.LOGIN_SUCCESS: {
            return (
                state.merge(Map({
                    isLoggedIn: true,
                    token: action.payload.token,
                    credentials: fromJS(action.payload.credentials)
                }))
            );
        }
        case actionTypes.LOGIN_FAILED: {
            return (
                state.merge(Map({
                    isLoggedIn: false,
                    error: action.error.response.data.message
                }))
            );
        }
        default: {
            return state;
        }
    }
}