import axios from "axios";
import * as constants from "../constants";
import * as urls from "../utilities/urls";

export function registrationRequest(credentials) {
    return {
        type: constants.REGISTER_USER,
        credentials
    }
}

export function registrationSuccess(payload) {
    return {
        type: constants.REGISTRATION_SUCCESS,
        payload
    }
}

export function registrationFailed(error) {
    return {
        type: constants.REGISTRATION_FAILED,
        error
    }
}

export function registerUser(credentials) {
    return dispatch => {
        dispatch(registrationRequest(credentials));
        return (
            axios.post(urls.API_URL + "auth/register", credentials)
                .then(response => {
                    let payload = {
                        type: constants.REGISTRATION_SUCCESS,
                        message: response.data.message,
                        credentials: credentials
                    };
                    dispatch(registrationSuccess(payload));
                })
                .catch(error => {
                    dispatch(registrationFailed(error));
                })
        );
    };
}