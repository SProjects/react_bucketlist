import {Map, fromJS} from 'immutable';
import * as actionTypes from "../constants";

const INITIAL_STATE = Map({
    isLoggedIn: false,
    fetching: false,
    fetched: false,
    error: null,
    credentials: Map({
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
        old_password: ''
    }),
    user: '',
    token: ''
});

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.LOGIN_USER:
        case actionTypes.LOGIN_SUCCESS: {
            return (
                state.merge(Map({
                    isLoggedIn: true,
                    token: action.token,
                    credentials: fromJS(action.credentials)
                }))
            );
        }
        default:
            return state;
    }
}