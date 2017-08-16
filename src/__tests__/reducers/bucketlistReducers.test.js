import { fromJS, Map, List } from "immutable";
import bucketlistReducers from "../../reducers/bucketlistReducers";
import * as actionTypes from "../../constants";

describe("Bucketlist Reducers", () => {
    let initialState;

    beforeEach(() => {
        initialState = new Map({
            fetching: false,
            error: null,
            message: '',
            bucketlists: List(),
            selectedBucketlist: null,
            bucketlistName: '',
            previous: null,
            next: null,
            showCreate: false,
            closeCreate: true,
            showEdit: false,
            closeEdit: true,
            showDelete: false,
            closeDelete: true
        });
    });

    it("should return default state if no action undefined", () => {
        let result = bucketlistReducers(undefined, {});

        expect(result).toEqual(initialState);
    });

    it("should handle BUCKETLISTS_REQUEST", () => {
        let result = bucketlistReducers(undefined, {type: actionTypes.BUCKETLISTS_REQUEST});
        let expectedState = initialState.merge({
            fetching: true
        });

        expect(result.toJS()).toEqual(expectedState.toJS());
    });

    it("should handle BUCKETLISTS_FETCHED", () => {
        let payload = {
            fetching: false,
            bucketlists: [{id: 1, name: "Bucketlist Name", items: []}],
            previous: null,
            next: null
        };
        let result = bucketlistReducers(initialState, {type: actionTypes.BUCKETLISTS_FETCHED, payload});
        let expectedState = initialState.merge({
            fetching: false,
            bucketlists: [{id: 1, name: "Bucketlist Name", items: []}],
            previous: null,
            next: null
        });

        expect(result).toEqual(expectedState);
    });

    it("should handle BUCKETLISTS_FETCH_FAILED", () => {
        let error = "Error";
        let result = bucketlistReducers(initialState, {type: actionTypes.BUCKETLISTS_FETCH_FAILED, error});
        let expectedState = initialState.merge({
            fetching: false,
            error: "Error"
        });

        expect(result).toEqual(expectedState);
    });

    it("should handle BUCKETLISTS_CREATE_REQUEST", () => {
        let result = bucketlistReducers(initialState, {type: actionTypes.BUCKETLISTS_CREATE_REQUEST});
        let expectedState = initialState.merge({
            showCreate: true,
            closeCreate: false
        });

        expect(result).toEqual(expectedState);
    });

    it("should handle BUCKETLISTS_CREATE_CLOSE", () => {
        let result = bucketlistReducers(initialState, {type: actionTypes.BUCKETLISTS_CREATE_CLOSE});
        let expectedState = initialState.merge({
            showCreate: false,
            closeCreate: true,
            selectedBucketlist: null,
            bucketlistName: ''
        });

        expect(result).toEqual(expectedState);
    });

    it("should handle BUCKETLISTS_NEW_NAME", () => {
        let name = "New name";
        let result = bucketlistReducers(initialState, {type: actionTypes.BUCKETLISTS_NEW_NAME, name});
        let expectedState = initialState.merge({
            bucketlistName: name
        });

        expect(result).toEqual(expectedState);
    });

    it("should handle BUCKETLISTS_NEW_REQUEST", () => {
        let result = bucketlistReducers(initialState, {type: actionTypes.BUCKETLISTS_NEW_REQUEST});

        expect(result).toEqual(initialState);
    });

    it("should handle BUCKETLISTS_CREATED", () => {
        let message = "Created";
        let result = bucketlistReducers(initialState, {type: actionTypes.BUCKETLISTS_CREATED, message});
        let expectedState = initialState.merge({
            message: message
        });

        expect(result).toEqual(expectedState);
    });

    it("should handle BUCKETLISTS_CREATE_FAILED", () => {
        let error = {
                response: {
                    data: {message: "Error"}
                }
            };
        let result = bucketlistReducers(initialState, {type: actionTypes.BUCKETLISTS_CREATE_FAILED, error});
        let expectedState = initialState.merge({
            error: "Error"
        });

        expect(result).toEqual(expectedState);
    });

    it("should handle BUCKETLISTS_UPDATE_REQUEST", () => {
        let bucketlist = fromJS({id: 2, name: "Bucketlist Name"});
        let result = bucketlistReducers(initialState, {type: actionTypes.BUCKETLISTS_UPDATE_REQUEST, bucketlist});
        let expectedState = initialState.merge({
            selectedBucketlist: fromJS(bucketlist),
            showEdit: true,
            closeEdit: false,
            bucketlistName: bucketlist.get("name")
        });

        expect(result).toEqual(expectedState);
    });

    it("should handle BUCKETLISTS_UPDATED", () => {
        let message = "Created";
        let result = bucketlistReducers(initialState, {type: actionTypes.BUCKETLISTS_UPDATED, message});
        let expectedState = initialState.merge({
            message: message
        });

        expect(result).toEqual(expectedState);
    });

    it("should handle BUCKETLISTS_UPDATE_CLOSE", () => {
        let result = bucketlistReducers(initialState, {type: actionTypes.BUCKETLISTS_UPDATE_CLOSE});
        let expectedState = initialState.merge({
            selectedBucketlist: null,
            showEdit: false,
            closeEdit: true,
            bucketlistName: ''
        });

        expect(result).toEqual(expectedState);
    });

    it("should handle BUCKETLISTS_UPDATE_FAILED", () => {
        let error = {
            response: {
                data: {message: "Error"}
            }
        };
        let result = bucketlistReducers(initialState, {type: actionTypes.BUCKETLISTS_UPDATE_FAILED, error});
        let expectedState = initialState.merge({
            error: "Error"
        });

        expect(result).toEqual(expectedState);
    });

    it("should handle BUCKETLISTS_DELETE_REQUEST", () => {
        let bucketlist = fromJS({id: 2, name: "Bucketlist Name"});
        let result = bucketlistReducers(initialState, {type: actionTypes.BUCKETLISTS_DELETE_REQUEST, bucketlist});
        let expectedState = initialState.merge({
            selectedBucketlist: fromJS(bucketlist),
            showDelete: true,
            closeDelete: false
        });

        expect(result).toEqual(expectedState);
    });

    it("should handle BUCKETLISTS_DELETE_CLOSE", () => {
        let result = bucketlistReducers(initialState, {type: actionTypes.BUCKETLISTS_DELETE_CLOSE});
        let expectedState = initialState.merge({
            selectedBucketlist: null,
            showDelete: false,
            closeDelete: true
        });

        expect(result).toEqual(expectedState);
    });

    it("should handle BUCKETLISTS_DELETED", () => {
        let message = "Deleted";
        let result = bucketlistReducers(initialState, {type: actionTypes.BUCKETLISTS_DELETED, message});
        let expectedState = initialState.merge({
            message: message
        });

        expect(result).toEqual(expectedState);
    });

    it("should handle BUCKETLISTS_DELETE_FAILED", () => {
        let error = {
            response: {
                data: {message: "Error"}
            }
        };
        let result = bucketlistReducers(initialState, {type: actionTypes.BUCKETLISTS_DELETE_FAILED, error});
        let expectedState = initialState.merge({
            error: "Error"
        });

        expect(result).toEqual(expectedState);
    });

    it("should handle BUCKETLISTS_MISSING_FIELDS", () => {
        let error = "Error";
        let result = bucketlistReducers(initialState, {type: actionTypes.BUCKETLISTS_MISSING_FIELDS, error});
        let expectedState = initialState.merge({
            error: "Error"
        });

        expect(result).toEqual(expectedState);
    });

    it("should handle BUCKETLISTS_CLEARS_MESSAGES", () => {
        let result = bucketlistReducers(initialState, {type: actionTypes.BUCKETLISTS_CLEARS_MESSAGES});
        let expectedState = initialState.merge({
            message: '',
            error: null
        });

        expect(result).toEqual(expectedState);
    });
});