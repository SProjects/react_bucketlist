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

export function editCurrentUserRequest() {
    return {
        type: constants.CURRENT_USER_EDIT_REQUEST
    }
}

export function closeEditCurrentUser() {
    return {
        type: constants.CURRENT_USER_EDIT_CLOSE
    }
}

export function updateCurrentUserRequest() {
    return {
        type: constants.CURRENT_USER_UPDATE_REQUEST
    }
}

export function updateCurrentUserFailed(error) {
    return {
        type: constants.CURRENT_USER_UPDATE_FAILED,
        error
    }
}

export function updateCurrentUser(user_id, payload) {
    let token = utils.getAuthToken();
    let headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Basic " + btoa(token + ":unused")
    };

    return dispatch => {
        dispatch(updateCurrentUserRequest());
        return (
            axios.put("http://127.0.0.1:5000/api/v1/users/" + user_id, payload, {headers: headers})
                .then(response => {
                    dispatch(loadCurrentUser(response.data));
                })
                .catch(error => {
                    dispatch(updateCurrentUserFailed(error));
                })
        )
    };
}