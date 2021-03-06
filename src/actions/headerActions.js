import axios from "axios";
import * as constants from "../constants";
import * as headerUtils from "../utilities/headers";
import * as urls from "../utilities/urls";

export function getCurrentUserRequest() {
	return {
		type: constants.CURRENT_USER_REQUEST
	};
}

export function loadCurrentUser(payload) {
	return {
		type: constants.CURRENT_USER_FETCHED,
		payload: payload
	};
}

function fetchCurrentUserFailed(error) {
	return {
		type: constants.CURRENT_USER_FETCHED_FAILED,
		error
	};
}

export function getCurrentUser() {
	let headers = headerUtils.getAuthHeaders();
	return dispatch => {
		dispatch(getCurrentUserRequest());
		return (
			axios.get(urls.API_URL + "users/1?token=true", {headers: headers})
				.then(response => {
					dispatch(loadCurrentUser(response.data));
					dispatch(clearMessages());
				})
				.catch(error => {
					dispatch(fetchCurrentUserFailed(error));
				})
		);
	};
}

export function editCurrentUserRequest() {
	return {
		type: constants.CURRENT_USER_EDIT_REQUEST
	};
}

export function closeEditCurrentUser() {
	return {
		type: constants.CURRENT_USER_EDIT_CLOSE
	};
}

function updateCurrentUserRequest() {
	return {
		type: constants.CURRENT_USER_UPDATE_REQUEST
	};
}

function updateCurrentUserFailed(error) {
	return {
		type: constants.CURRENT_USER_UPDATE_FAILED,
		error
	};
}

function userUpdated(message) {
	return {
		type: constants.CURRENT_USER_UPDATED,
		message
	};
}

export function updateCurrentUser(user_id, payload) {
	let headers = headerUtils.getAuthHeaders();
	return dispatch => {
		dispatch(updateCurrentUserRequest());
		return (
			axios.put(urls.API_URL + "users/" + user_id, payload, {headers: headers})
				.then(response => {
					dispatch(userUpdated("Account successfully updated."));
					dispatch(loadCurrentUser(response.data));
				})
				.catch(error => {
					dispatch(updateCurrentUserFailed(error));
				})
		);
	};
}

export function missingFields(error) {
	return {
		type: constants.CURRENT_USER_MISSING_FIELD,
		error
	};
}

function clearMessages() {
	return {
		type: constants.CURRENT_USER_CLEAR_MESSAGES
	};
}