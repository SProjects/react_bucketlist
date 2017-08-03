import {Map, fromJS, List} from 'immutable';
import * as actionTypes from "../constants";

const INITIAL_STATE = Map({
    loading: true,
    error: null,
    message: '',
    bucketlist: null,
    items: List()
});

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.ITEMS_REQUEST: {
            return state.merge(Map({
                bucketlist: action.bucketlist,
                items: action.items,
                loading: false
            }))
        }
        default: {
            return state;
        }
    }
}