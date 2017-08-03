import axios from "axios";
import * as constants from "../constants";
import * as headerUtils from "../utilities/headers";
import * as urls from "../utilities/urls";


export function showItems(bucketlist) {
    return {
        type: constants.ITEMS_REQUEST,
        bucketlist: bucketlist,
        items: bucketlist.items
    }
}

export function loadItems(bucketlist) {
    let headers = headerUtils.getAuthHeaders();
    let bucketlist_id = bucketlist.get("id");
    return dispatch => {
        return (
            axios.get(urls.API_URL + "bucketlists/" + bucketlist_id, {headers: headers})
                .then(response => {
                    dispatch(showItems(response.data));
                })
                .catch(error => {
                    console.error(error);
                })
        )
    };
}

export function editRequest(item) {
    return {
        type: constants.ITEMS_EDIT_REQUEST,
        item
    }
}

export function itemUpdated(message) {
    return {
        type: constants.ITEMS_UPDATED,
        message
    }
}

export function closeEdit() {
    return {
        type: constants.ITEMS_EDIT_CLOSE
    }
}

export function updateFailed(error) {
    return {
        type: constants.ITEMS_EDIT_FAILED,
        error
    }
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
                    dispatch(loadItems(bucketlist));
                })
                .catch(error => {
                    dispatch(updateFailed(error));
                })
        )
    }
}