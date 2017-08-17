import React from "react";
import { assert, expect } from "chai";
import moxios from "moxios";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as actions from "../../actions/headerActions";
import * as constants from "../../constants";
import * as headerUtils from "../../utilities/headers";

describe("Header Actions", () => {
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
        moxios.uninstall()
    });

    it("#getCurrentUser on success", () => {
        const payload = {id: 1, first_name: "First"};
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: payload
            });
        });

        let expectedActions = [
            constants.CURRENT_USER_REQUEST, constants.CURRENT_USER_FETCHED,
            constants.CURRENT_USER_CLEAR_MESSAGES
        ];
        let store = mockStore();

        return store.dispatch(actions.getCurrentUser()).then(() => {
            let storeActions = [];
            store.getActions().forEach((actions) => {
                storeActions.push(actions.type);
            });

            expect(storeActions).to.deep.equal(expectedActions);
        });
    });

    it("#updateCurrentUser on success", () => {
        const payload = {id: 1, first_name: "First"};
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: payload
            });
        });

        let expectedActions = [
            constants.CURRENT_USER_REQUEST, constants.CURRENT_USER_FETCHED,
            constants.CURRENT_USER_CLEAR_MESSAGES
        ];
        let store = mockStore();

        return store.dispatch(actions.getCurrentUser()).then(() => {
            let storeActions = [];
            store.getActions().forEach((actions) => {
                storeActions.push(actions.type);
            });

            expect(storeActions).to.deep.equal(expectedActions);
        });
    });
});