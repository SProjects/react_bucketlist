import {Map, fromJS, List} from 'immutable';
import * as actionTypes from "../constants";

const INITIAL_STATE = Map({
    loading: true,
    error: null,
    message: '',
    bucketlist: null,
    items: List(),
    selectedItem: null,
    showEdit: false,
    closeEdit: true,
    showDelete: false,
    closeDelete: true,
    showCreate: false,
    closeCreate: true
});

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.ITEMS_REQUEST: {
            return state.merge(Map({
                bucketlist: fromJS(action.bucketlist),
                items: fromJS(action.items),
                loading: false
            }))
        }
        case actionTypes.ITEMS_EDIT_REQUEST: {
            return state.merge(Map({
                selectedItem: action.item,
                showEdit: true,
                closeEdit: false
            }))
        }
        case actionTypes.ITEMS_UPDATED: {
            return state.merge(Map({
                message: action.message
            }))
        }
        case actionTypes.ITEMS_EDIT_CLOSE: {
            return state.merge(Map({
                selectedItem: null,
                showEdit: false,
                closeEdit: true
            }))
        }
        case actionTypes.ITEMS_EDIT_FAILED: {
            return state.merge(Map({
                selectedItem: null,
                showEdit: false,
                closeEdit: true,
                error: action.error.response.data.message
            }))
        }
        case actionTypes.ITEMS_DELETE_REQUEST: {
            return state.merge(Map({
                selectedItem: action.item,
                showDelete: true,
                closeDelete: false
            }))
        }
        case actionTypes.ITEMS_DELETE_CLOSE: {
            return state.merge(Map({
                selectedItem: null,
                showDelete: false,
                closeDelete: true
            }))
        }
        case actionTypes.ITEMS_DELETED: {
            return state.merge(Map({
                selectedItem: null,
                showDelete: false,
                closeDelete: true,
                message: action.message
            }))
        }
        case actionTypes.ITEMS_DELETE_FAILED: {
            return state.merge(Map({
                error: action.error.response.data.message
            }))
        }
        case actionTypes.ITEMS_CREATE_REQUEST: {
            return state.merge(Map({
                showCreate: true,
                closeCreate: false
            }))
        }
        case actionTypes.ITEMS_CREATE_CLOSE: {
            return state.merge(Map({
                showCreate: false,
                closeCreate: true
            }))
        }
        case actionTypes.ITEMS_CREATED: {
            return state.merge(Map({
                message: action.message
            }))
        }
        case actionTypes.ITEMS_CREATE_FAILED: {
            return state.merge(Map({
                error: action.error.response.data.message
            }))
        }
        case actionTypes.ITEMS_MISSING_FIELDS: {
            return state.merge(Map({
                error: action.error
            }))
        }
        case actionTypes.ITEMS_CLEARS_MESSAGES: {
            return state.merge(Map({
                message: "",
                error: null
            }))
        }
        default: {
            return state;
        }
    }
}