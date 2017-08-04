import {Map, fromJS} from 'immutable';
import * as actionTypes from "../constants";

const INITIAL_STATE = Map({
    fetching: false,
    registered: false,
    error: null,
    message: '',
    credentials: Map({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirm: ''
    })
});

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.REGISTER_USER:
            return state;
        case actionTypes.REGISTRATION_SUCCESS: {
            return (
                state.merge(Map({
                    registered: true,
                    message: action.payload.message,
                    credentials: fromJS(action.payload.credentials)
                }))
            );
        }
        case actionTypes.REGISTRATION_FAILED: {
            return (
                state.merge(Map({
                    error: action.error.response.data.message,
                    registered: false
                }))
            );
        }
        case actionTypes.REGISTRATION_MISSING_FIELD: {
            return (
                state.merge(Map({
                    error: action.error,
                    registered: false
                }))
            );
        }
        default: {
            return state;
        }
    }
}