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
    closeEdit: true
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
                error: action.error
            }))
        }
        default: {
            return state;
        }
    }
}