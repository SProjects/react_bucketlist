import axios from "axios";
import * as constants from "../constants";
import * as headerUtils from "../utilities/headers";
import * as urls from "../utilities/urls";


export function bucketlistRequest() {
	return {
		type: constants.BUCKETLISTS_REQUEST
	};
}

export function listBucketlists(payload) {
	return {
		type: constants.BUCKETLISTS_FETCHED,
		payload
	};
}

export function bucketlistFetchFailed(error) {
	return {
		type: constants.BUCKETLISTS_FETCH_FAILED,
		error
	};
}

export function getBucketlists(limit = 4) {
	let headers = headerUtils.getAuthHeaders();
	return dispatch => {
		dispatch(bucketlistRequest());
		return (
			axios.get(urls.API_URL + "bucketlists?limit=" + limit, {headers: headers})
				.then(response => {
					let payload = {
						type: constants.BUCKETLISTS_FETCHED,
						bucketlists: response.data.results,
						next: response.data.next,
						previous: response.data.prev
					};
					dispatch(listBucketlists(payload));
					dispatch(clearMessages());
				})
				.catch(error => {
					dispatch(bucketlistFetchFailed(error));
				})
		);
	};
}

export function createRequest() {
	return {
		type: constants.BUCKETLISTS_CREATE_REQUEST
	};
}

export function closeCreate() {
	return {
		type: constants.BUCKETLISTS_CREATE_CLOSE
	};
}

export function newBucketlistRequest() {
	return {
		type: constants.BUCKETLISTS_NEW_REQUEST
	};
}

export function newBucketlistName(name) {
	return {
		type: constants.BUCKETLISTS_NEW_NAME,
		name
	};
}

export function newBucketlistCreated(message) {
	return {
		type: constants.BUCKETLISTS_CREATED,
		message
	};
}

export function bucketlistCreateFailed(error) {
	return {
		type: constants.BUCKETLISTS_CREATE_FAILED,
		error
	};
}

export function create(payload) {
	let headers = headerUtils.getAuthHeaders();
	return dispatch => {
		dispatch(newBucketlistRequest());
		return (
			axios.post(urls.API_URL + "bucketlists", payload, {headers: headers})
				.then(response => {
					dispatch(newBucketlistCreated(response.data.message));
					dispatch(closeCreate());
					dispatch(getBucketlists());
				})
				.catch(error => {
					dispatch(bucketlistCreateFailed(error));
				})
		);
	};
}

export function search(searchTerm) {
	let headers = headerUtils.getAuthHeaders();
	return dispatch => {
		dispatch(newBucketlistRequest());
		return (
			axios.get(urls.API_URL + "bucketlists?q=" + searchTerm, {headers: headers})
				.then(response => {
					let payload = {
						type: constants.BUCKETLISTS_FETCHED,
						bucketlists: response.data.results,
						next: response.data.next || "",
						previous: response.data.prev || ""
					};
					dispatch(listBucketlists(payload));
				})
				.catch(error => {
					dispatch(bucketlistFetchFailed(error));
				})
		);
	};
}

export function navigate(urlPath) {
	let headers = headerUtils.getAuthHeaders();
	return dispatch => {
		dispatch(bucketlistRequest());
		return (
			axios.get(urls.BASE_URL + urlPath, {headers: headers})
				.then(response => {
					let payload = {
						type: constants.BUCKETLISTS_FETCHED,
						bucketlists: response.data.results,
						next: response.data.next,
						previous: response.data.prev
					};
					dispatch(clearMessages());
					dispatch(listBucketlists(payload));
				})
				.catch(error => {
					dispatch(bucketlistFetchFailed(error));
				})
		);
	};
}

export function updateRequest(bucketlist) {
	return {
		type: constants.BUCKETLISTS_UPDATE_REQUEST,
		bucketlist
	};
}

export function closeEdit() {
	return {
		type: constants.BUCKETLISTS_UPDATE_CLOSE
	};
}

export function bucketlistUpdated(message) {
	return {
		type: constants.BUCKETLISTS_UPDATED,
		message
	};
}

export function bucketlistUpdateFailed(error) {
	return {
		type: constants.BUCKETLISTS_UPDATE_FAILED,
		error
	};
}

export function clearMessages() {
	return {
		type: constants.BUCKETLISTS_CLEARS_MESSAGES
	};
}

export function update(id, payload) {
	let headers = headerUtils.getAuthHeaders();
	return dispatch => {
		return (
			axios.put(urls.API_URL + "bucketlists/" + id, payload, {headers: headers})
				.then(() => {
					let message = "Bucketlist updated successfully.";
					dispatch(bucketlistUpdated(message));
					dispatch(closeEdit());
					dispatch(getBucketlists());
				})
				.catch(error => {
					dispatch(bucketlistUpdateFailed(error));
				})
		);
	};
}

export function deleteRequest(bucketlist) {
	return {
		type: constants.BUCKETLISTS_DELETE_REQUEST,
		bucketlist
	};
}

export function closeDelete() {
	return {
		type: constants.BUCKETLISTS_DELETE_CLOSE
	};
}

export function bucketlistDeleted(message) {
	return {
		type: constants.BUCKETLISTS_DELETED,
		message
	};
}

export function bucketlistDeleteFailed(error) {
	return {
		type: constants.BUCKETLISTS_DELETE_FAILED,
		error
	};
}

export function destroy(id) {
	let headers = headerUtils.getAuthHeaders();
	return dispatch => {
		return (
			axios.delete(urls.API_URL + "bucketlists/" + id, {headers: headers})
				.then(response => {
					dispatch(bucketlistDeleted(response.data.message));
					dispatch(closeDelete());
					dispatch(getBucketlists());
				})
				.catch(error => {
					dispatch(bucketlistDeleteFailed(error));
				})
		);
	};
}

export function missingFields(error) {
	return {
		type: constants.BUCKETLISTS_MISSING_FIELDS,
		error
	};
}