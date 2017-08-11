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
                    credentials: fromJS(action.payload.credentials),
                    error: null
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
        case actionTypes.LOGIN_MISSING_FIELDS: {
            return (
                state.merge(Map({
                    isLoggedIn: false,
                    error: action.error
                }))
            );
        }
        case actionTypes.AUTH_FIELD_CHANGE: {
            return (
                state.merge(Map({
                    credentials: fromJS(action.credentials)
                }))
            )
        }
        default: {
            return state;
        }
    }
}