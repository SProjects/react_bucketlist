import axios from "axios";
import * as constants from "../constants";

export function loginRequest(credentials) {
    return {
      type: constants.LOGIN_USER,
      credentials
    };
}

export function loginSuccess(payload) {
    return {
        type: constants.LOGIN_SUCCESS,
        payload
    }
}

export function loginUser(credentials) {
    return dispatch => {
        dispatch(loginRequest(credentials));
        return (
            axios.post("http://127.0.0.1:5000/api/v1/auth/login", credentials)
                .then(response => {
                    let payload = {
                        type: constants.LOGIN_SUCCESS,
                        token: response.data.token,
                        credentials: credentials
                    };
                    dispatch(loginSuccess(payload));
                })
                .catch(error => {
                    console.log("Error: ", error);
                })
        );
    };
}