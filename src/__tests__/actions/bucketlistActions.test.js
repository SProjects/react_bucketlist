import React from "react";
import { assert, expect } from "chai";
import moxios from "moxios";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as actions from "../../actions/bucketlistActions";
import * as constants from "../../constants";
import * as headerUtils from "../../utilities/headers";

describe("Bucketlist Actions", () => {
    const middlewares = [ thunk ];
    const mockStore = configureStore(middlewares);

    beforeEach(function () {
        moxios.install();
        global.localStorage = jest.genMockFunction();
        global.localStorage.setItem = jest.genMockFunction();
        global.localStorage.getItem = jest.genMockFunction();
        headerUtils.getAuthHeaders = jest.genMockFunction();
    });

    afterEach(function () {
        moxios.uninstall();
    });

    it("#getBucketlists expected actions are dispatched on success", () => {
        const payload = {
            results: [{id: 1, name: "Bucketlist Name", items: []}],
            next: "link/to/next/bucketlist/page"
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: payload
            });
        });

        let expectedActions = [constants.BUCKETLISTS_REQUEST, constants.BUCKETLISTS_FETCHED];
        let store = mockStore();

        return store.dispatch(actions.getBucketlists()).then(() => {
            let storeActions = [];
            store.getActions().forEach((actions) => {
                storeActions.push(actions.type);
            });

            expect(storeActions).to.deep.equal(expectedActions);
        });
    });

    it("#create expected actions are dispatched on success", () => {
        const payload = {
            name: "New Bucketlist Name"
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: payload
            });
        });

        let expectedActions = [
            constants.BUCKETLISTS_NEW_REQUEST, constants.BUCKETLISTS_CREATED,
            constants.BUCKETLISTS_CREATE_CLOSE, constants.BUCKETLISTS_REQUEST
        ];
        let store = mockStore();

        return store.dispatch(actions.create()).then(() => {
            let storeActions = [];
            store.getActions().forEach((actions) => {
                storeActions.push(actions.type);
            });

            expect(storeActions).to.deep.equal(expectedActions);
        });
    });

    it("#search expected action dispatched on success", () => {
        const searchTerm = "Search Term";
        const payload = [{id: 1, name: "Bucketlist Name", items: []}];
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: payload
            });
        });

        let expectedActions = [
            constants.BUCKETLISTS_NEW_REQUEST, constants.BUCKETLISTS_FETCHED
        ];
        let store = mockStore();

        return store.dispatch(actions.search(searchTerm)).then(() => {
            let storeActions = [];
            store.getActions().forEach((actions) => {
                storeActions.push(actions.type);
            });

            expect(storeActions).to.deep.equal(expectedActions);
        });
    });

    it("#navigate", () => {
        const payload = [
            {
                results: {id: 1, name: "Bucketlist Name", items: []},
                previous: "/link/to/previous/page",
                next: "/link/to/next/page/2"
            }
        ];
        const urlPath = "/link/to/next/page/1";
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: payload
            });
        });

        let expectedActions = [
            constants.BUCKETLISTS_REQUEST, constants.BUCKETLISTS_CLEARS_MESSAGES,
            constants.BUCKETLISTS_FETCHED
        ];
        let store = mockStore();

        return store.dispatch(actions.navigate(urlPath)).then(() => {
            let storeActions = [];
            store.getActions().forEach((actions) => {
                storeActions.push(actions.type);
            });

            expect(storeActions).to.deep.equal(expectedActions);
        });
    });

    it("#update", () => {
        const bucketlist_id = 1;
        const payload = {
            name: "Updated Bucketlist Name"
        };
        const response_payload = {id: 1, name: "Updated Bucketlist Name", items: []};
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: response_payload
            });
        });

        let expectedActions = [
            constants.BUCKETLISTS_UPDATED, constants.BUCKETLISTS_UPDATE_CLOSE,
            constants.BUCKETLISTS_REQUEST
        ];
        let store = mockStore();

        return store.dispatch(actions.update(bucketlist_id, payload)).then(() => {
            let storeActions = [];
            store.getActions().forEach((actions) => {
                storeActions.push(actions.type);
            });

            expect(storeActions).to.deep.equal(expectedActions);
        });
    });

    it("#destroy", () => {
        const bucketlist_id = 1;
        const payload = {
            message: "Deleted"
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: payload
            });
        });

        let expectedActions = [
            constants.BUCKETLISTS_DELETED, constants.BUCKETLISTS_DELETE_CLOSE,
            constants.BUCKETLISTS_REQUEST
        ];
        let store = mockStore();

        return store.dispatch(actions.destroy(bucketlist_id)).then(() => {
            let storeActions = [];
            store.getActions().forEach((actions) => {
                storeActions.push(actions.type);
            });

            expect(storeActions).to.deep.equal(expectedActions);
        });
    });
});