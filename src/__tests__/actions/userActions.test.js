import React from "react";
import { assert, expect } from "chai";
import moxios from "moxios";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as actions from "../../actions/userActions";
import * as constants from "../../constants";
import * as utils from '../../utilities/tokenUtilities';

describe("User Actions", () => {
    const middlewares = [ thunk ];
    const mockStore = configureStore(middlewares);

    beforeEach(function () {
        moxios.install();

        global.localStorage = jest.genMockFunction();
        global.localStorage.setItem = jest.genMockFunction();
        global.localStorage.getItem = jest.genMockFunction();
        utils.setAuthToken = jest.genMockFunction();
    });

    afterEach(function () {
        moxios.uninstall()
    });

    it("#registerUser on success", () => {
        const payload = {first_name: "First", last_name: "Last", email: "fake@email.com",
            password: "pass", confirm_password: "pass"};
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {message: "Created"}
            });
        });

        let expectedActions = [
            constants.REGISTER_USER, constants.REGISTRATION_SUCCESS
        ];
        let store = mockStore();

        return store.dispatch(actions.registerUser(payload)).then(() => {
            let storeActions = [];
            store.getActions().forEach((actions) => {
                storeActions.push(actions.type);
            });

            expect(storeActions).to.deep.equal(expectedActions);
        });
    });

    it("#registerUser on fail", () => {
        const payload = {first_name: "First", last_name: "Last", email: "fake@email.com",
            password: "pass", confirm_password: "pass"};
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 403,
                response: {error: 'Error'}
            });
        });

        let expectedActions = [
            constants.REGISTER_USER, constants.REGISTRATION_FAILED
        ];
        let store = mockStore();

        return store.dispatch(actions.registerUser(payload)).then(() => {
            let storeActions = [];
            store.getActions().forEach((actions) => {
                storeActions.push(actions.type);
            });

            expect(storeActions).to.deep.equal(expectedActions);
        });
    });

    it("#missingFields expected action is dispatched", () => {
        const message = "Fields are required";
        const expectedActions = {type: constants.REGISTRATION_MISSING_FIELD, error: message};
        const store = mockStore();

        let result = store.dispatch(actions.missingFields(message));

        expect(result).to.deep.equal(expectedActions);
    });
});