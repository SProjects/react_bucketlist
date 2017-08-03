import axios from "axios";
import * as constants from "../constants";
import * as utils from "../utilities/tokenUtilities";


export function bucketlistRequest() {
    return {
        type: constants.BUCKETLISTS_REQUEST
    }
}

export function listBucketlists(payload) {
    return {
        type: constants.BUCKETLISTS_FETCHED,
        payload
    }
}

export function bucketlistFetchFailed(error) {
    return {
        type: constants.BUCKETLISTS_FETCH_FAILED,
        error
    }
}

export function getBucketlists(limit = 4) {
    let token = utils.getAuthToken();
    let headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Basic " + btoa(token + ":unused")
    };

    return dispatch => {
        dispatch(bucketlistRequest());
        return (
            axios.get("http://127.0.0.1:5000/api/v1/bucketlists?limit=" + limit, {headers: headers})
                .then(response => {
                    let payload = {
                        type: constants.BUCKETLISTS_FETCHED,
                        bucketlists: response.data.results,
                        next: response.data.next,
                        previous: response.data.prev
                    };
                    dispatch(listBucketlists(payload));
                })
                .catch(error => {
                    dispatch(bucketlistFetchFailed(error))
                })
        );
    }
}

export function createRequest() {
    return {
        type: constants.BUCKETLISTS_CREATE_REQUEST
    }
}

export function closeCreate() {
    return {
        type: constants.BUCKETLISTS_CREATE_CLOSE
    }
}

export function newBucketlistRequest() {
    return {
        type: constants.BUCKETLISTS_NEW_REQUEST
    }
}

export function newBucketlistCreated(message) {
    return {
        type: constants.BUCKETLISTS_CREATED,
        message
    }
}

export function bucketlistCreateFailed(error) {
    return {
        type: constants.BUCKETLISTS_CREATE_FAILED,
        error
    }
}

export function create(payload) {
    let token = utils.getAuthToken();
    let headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Basic " + btoa(token + ":unused")
    };

    return dispatch => {
        dispatch(newBucketlistRequest());
        return (
            axios.post("http://127.0.0.1:5000/api/v1/bucketlists", payload, {headers: headers})
                .then(response => {
                    dispatch(newBucketlistCreated(response.data.message));
                    dispatch(closeCreate());
                })
                .catch(error => {
                    dispatch(bucketlistCreateFailed(error));
                })
        )
    }
}