import axios from "axios";
import * as constants from "../constants";
import * as utils from '../utilities/tokenUtilities';

export function loginRequest() {
    return {
      type: constants.LOGIN_USER
    };
}

export function loginSuccess(payload) {
    return {
        type: constants.LOGIN_SUCCESS,
        payload
    }
}

export function loginFailed(error) {
    return {
        type: constants.LOGIN_FAILED,
        error
    }
}

export function loginUser(credentials) {
    return dispatch => {
        dispatch(loginRequest());
        return (
            axios.post("http://127.0.0.1:5000/api/v1/auth/login", credentials)
                .then(response => {
                    let payload = {
                        type: constants.LOGIN_SUCCESS,
                        token: response.data.token,
                        credentials: credentials
                    };
                    utils.setAuthToken(response.data.token);
                    dispatch(loginSuccess(payload));
                })
                .catch(error => {
                    dispatch(loginFailed(error));
                })
        );
    };
}