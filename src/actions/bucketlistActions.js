import axios from "axios";
import * as constants from "../constants";
import * as headerUtils from "../utilities/headers";
import * as urls from "../utilities/urls";


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
                })
                .catch(error => {
                    dispatch(bucketlistFetchFailed(error));
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
    let headers = headerUtils.getAuthHeaders();
    return dispatch => {
        dispatch(newBucketlistRequest());
        return (
            axios.post(urls.API_URL + "bucketlists", payload, {headers: headers})
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
                        next: response.data.next || '',
                        previous: response.data.prev || ''
                    };
                    dispatch(listBucketlists(payload));
                })
                .catch(error => {
                    dispatch(bucketlistFetchFailed(error));
                })
        )
    }
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
                    dispatch(listBucketlists(payload));
                })
                .catch(error => {
                    dispatch(bucketlistFetchFailed(error));
                })
        )
    }
}