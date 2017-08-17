import {Map, fromJS, List} from "immutable";
import * as actionTypes from "../constants";

const INITIAL_STATE = Map({
	fetching: false,
	error: null,
	message: "",
	bucketlists: List(),
	selectedBucketlist: null,
	bucketlistName: "",
	previous: null,
	next: null,
	showCreate: false,
	closeCreate: true,
	showEdit: false,
	closeEdit: true,
	showDelete: false,
	closeDelete: true
});

export default function(state=INITIAL_STATE, action) {
	switch (action.type) {
	case actionTypes.BUCKETLISTS_REQUEST: {
		return state.merge(Map({
			fetching: true
		}));
	}
	case actionTypes.BUCKETLISTS_FETCHED: {
		return state.merge(Map({
			fetching: false,
			bucketlists: fromJS(action.payload.bucketlists),
			previous: action.payload.previous,
			next: action.payload.next
		}));
	}
	case actionTypes.BUCKETLISTS_FETCH_FAILED: {
		return state.merge(Map({
			fetching: false,
			error: action.error
		}));
	}
	case actionTypes.BUCKETLISTS_CREATE_REQUEST: {
		return state.merge(Map({
			showCreate: true,
			closeCreate: false
		}));
	}
	case actionTypes.BUCKETLISTS_CREATE_CLOSE: {
		return state.merge(Map({
			showCreate: false,
			closeCreate: true,
			selectedBucketlist: null,
			bucketlistName: ""
		}));
	}
	case actionTypes.BUCKETLISTS_NEW_NAME: {
		return state.merge(Map({
			bucketlistName: action.name
		}));
	}
	case actionTypes.BUCKETLISTS_NEW_REQUEST: {
		return state;
	}
	case actionTypes.BUCKETLISTS_CREATED: {
		return state.merge(Map({
			message: action.message
		}));
	}
	case actionTypes.BUCKETLISTS_CREATE_FAILED: {
		return state.merge(Map({
			error: action.error.response.data.message
		}));
	}
	case actionTypes.BUCKETLISTS_UPDATE_REQUEST: {
		return state.merge(Map({
			selectedBucketlist: fromJS(action.bucketlist),
			showEdit: true,
			closeEdit: false,
			bucketlistName: action.bucketlist.get("name")
		}));
	}
	case actionTypes.BUCKETLISTS_UPDATED: {
		return state.merge(Map({
			message: action.message
		}));
	}
	case actionTypes.BUCKETLISTS_UPDATE_CLOSE: {
		return state.merge(Map({
			selectedBucketlist: null,
			showEdit: false,
			closeEdit: true,
			bucketlistName: ""
		}));
	}
	case actionTypes.BUCKETLISTS_UPDATE_FAILED: {
		return state.merge(Map({
			error: action.error.response.data.message
		}));
	}
	case actionTypes.BUCKETLISTS_DELETE_REQUEST: {
		return state.merge(Map({
			selectedBucketlist: fromJS(action.bucketlist),
			showDelete: true,
			closeDelete: false
		}));
	}
	case actionTypes.BUCKETLISTS_DELETE_CLOSE: {
		return state.merge(Map({
			selectedBucketlist: null,
			showDelete: false,
			closeDelete: true
		}));
	}
	case actionTypes.BUCKETLISTS_DELETED: {
		return state.merge(Map({
			message: action.message
		}));
	}
	case actionTypes.BUCKETLISTS_DELETE_FAILED: {
		return state.merge(Map({
			error: action.error.response.data.message
		}));
	}
	case actionTypes.BUCKETLISTS_MISSING_FIELDS: {
		return state.merge(Map({
			error: action.error
		}));
	}
	case actionTypes.BUCKETLISTS_CLEARS_MESSAGES: {
		return state.merge(Map({
			message: "",
			error: null
		}));
	}
	default: {
		return state;
	}
	}
}