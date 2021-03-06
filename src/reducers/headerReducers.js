import {Map} from "immutable";
import * as actionTypes from "../constants";

const INITIAL_STATE = Map({
	user: Map({
		id: null,
		first_name: "",
		last_name: "",
		email: "",
		bucketlist_url: "",
	}),
	show: false,
	close: true,
	message: "",
	error: null
});

export default function(state=INITIAL_STATE, action) {
	switch (action.type) {
	case actionTypes.CURRENT_USER_REQUEST:
		return state;
	case actionTypes.CURRENT_USER_FETCHED: {
		return state.merge(Map({
			user: action.payload,
			message: ""
		}));
	}
	case actionTypes.CURRENT_USER_FETCHED_FAILED: {
		return state.merge(Map({
			error: action.error.response.data.message
		}));
	}
	case actionTypes.CURRENT_USER_EDIT_REQUEST: {
		return state.merge(Map({
			show: true,
			close: false
		}));
	}
	case actionTypes.CURRENT_USER_EDIT_CLOSE: {
		return state.merge(Map({
			show: false,
			close: true
		}));
	}
	case actionTypes.CURRENT_USER_UPDATE_REQUEST: {
		return state;
	}
	case actionTypes.CURRENT_USER_UPDATE_FAILED: {
		return state.merge(Map({
			error: action.error.response.data.message
		}));
	}
	case actionTypes.CURRENT_USER_UPDATED: {
		return state.merge(Map({
			message: action.message
		}));
	}
	case actionTypes.CURRENT_USER_MISSING_FIELD: {
		return state.merge(Map({
			error: action.error
		}));
	}
	case actionTypes.CURRENT_USER_CLEAR_MESSAGES: {
		return state.merge(Map({
			error: null,
			message: ""
		}));
	}
	default: {
		return state;
	}
	}
}