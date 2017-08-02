import axios from "axios";
import * as constants from "../constants";
import * as utils from "../utilities/tokenUtilities";

export function getCurrentUserRequest() {
    return {
        type: constants.CURRENT_USER_REQUEST
    }
}

export function loadCurrentUser(payload) {
    return {
        type: constants.CURRENT_USER_FETCHED,
        payload: payload
    }
}

export function fetchCurrentUserFailed(error) {
    return {
        type: constants.CURRENT_USER_FETCHED_FAILED,
        error
    }
}

export function getCurrentUser() {
    let token = utils.getAuthToken();
    let headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Basic " + btoa(token + ":unused")
    };

    return dispatch => {
        dispatch(getCurrentUserRequest());
        return (
            axios.get("http://127.0.0.1:5000/api/v1/users/1?token=true", {headers: headers})
                .then(response => {
                    dispatch(loadCurrentUser(response.data));
                })
                .catch(error => {
                    dispatch(fetchCurrentUserFailed(error));
                })
        )
    }
}