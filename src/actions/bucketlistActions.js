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