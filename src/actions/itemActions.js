import axios from "axios";
import * as constants from "../constants";
import * as headerUtils from "../utilities/headers";
import * as urls from "../utilities/urls";


function showItems(bucketlist) {
	return {
		type: constants.ITEMS_REQUEST,
		bucketlist: bucketlist,
		items: bucketlist.items
	};
}

export function loadItems(bucketlist_id) {
	let headers = headerUtils.getAuthHeaders();
	return dispatch => {
		return (
			axios.get(urls.API_URL + "bucketlists/" + bucketlist_id, {headers: headers})
				.then(response => {
					dispatch(clearMessages());
					dispatch(showItems(response.data));
				})
				.catch(error => {
					console.error(error);
				})
		);
	};
}

export function editRequest(item) {
	return {
		type: constants.ITEMS_EDIT_REQUEST,
		item
	};
}

function itemUpdated(message) {
	return {
		type: constants.ITEMS_UPDATED,
		message
	};
}

export function closeEdit() {
	return {
		type: constants.ITEMS_EDIT_CLOSE
	};
}

function updateFailed(error) {
	return {
		type: constants.ITEMS_EDIT_FAILED,
		error
	};
}

export function update(bucketlist, id, payload) {
	let headers = headerUtils.getAuthHeaders();
	let bucketlist_id = bucketlist.get("id");
	return dispatch => {
		return (
			axios.put(urls.API_URL + "bucketlists/" + bucketlist_id + "/items/" + id, payload, {headers: headers})
				.then(() => {
					let message = "Item successfully updated.";
					dispatch(itemUpdated(message));
					dispatch(closeEdit());
					dispatch(loadItems(bucketlist_id));
				})
				.catch(error => {
					dispatch(updateFailed(error));
				})
		);
	};
}

export function updateStatus(bucketlist, item, status) {
	return dispatch => {
		dispatch(update(bucketlist, item.get("id"), {done: status}));
	};
}

export function newItemRequest() {
	return {
		type: constants.ITEMS_CREATE_REQUEST
	};
}

export function newItemName(name) {
	return {
		type: constants.ITEMS_NEW_NAME,
		name
	};
}

export function closeCreate() {
	return {
		type: constants.ITEMS_CREATE_CLOSE
	};
}

function itemCreated(message) {
	return {
		type: constants.ITEMS_CREATED,
		message
	};
}

function itemCreateFailed(error) {
	return {
		type: constants.ITEMS_CREATE_FAILED,
		error
	};
}

export function create(bucketlist, payload) {
	let headers = headerUtils.getAuthHeaders();
	let bucketlist_id = bucketlist.get("id");
	return dispatch => {
		return(
			axios.post(urls.API_URL + "bucketlists/" + bucketlist_id + "/items", payload, {headers: headers})
				.then(response => {
					dispatch(itemCreated(response.data.message));
					dispatch(closeCreate());
					dispatch(loadItems(bucketlist_id));
				})
				.catch(error => {
					dispatch(itemCreateFailed(error));
				})
		);
	};
}

export function deleteRequest(item) {
	return {
		type: constants.ITEMS_DELETE_REQUEST,
		item
	};
}

export function closeDelete() {
	return {
		type: constants.ITEMS_DELETE_CLOSE
	};
}

function itemDeleted(message) {
	return {
		type: constants.ITEMS_DELETED,
		message
	};
}

function itemDeleteFailed(error) {
	return {
		type: constants.ITEMS_DELETE_FAILED,
		error
	};
}

export function destroy(bucketlist, item) {
	let headers = headerUtils.getAuthHeaders();
	let bucketlist_id = bucketlist.get("id");
	let id = item.get("id");
	return dispatch => {
		return (
			axios.delete(urls.API_URL + "bucketlists/" + bucketlist_id + "/items/" + id, {headers: headers})
				.then(response => {
					dispatch(itemDeleted(response.data.message));
					dispatch(loadItems(bucketlist_id));
				})
				.catch(error => {
					dispatch(itemDeleteFailed(error));
				})
		);
	};
}

export function missingFields(error) {
	return {
		type: constants.ITEMS_MISSING_FIELDS,
		error
	};
}

function clearMessages() {
	return {
		type: constants.ITEMS_CLEARS_MESSAGES
	};
}