import React from "react";
import { assert, expect } from "chai";
import moxios from "moxios";
import sinon from "sinon";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as urls from "../../utilities/urls";
import * as actions from "../../actions/authActions";
import * as constants from "../../constants";
import * as utils from '../../utilities/tokenUtilities';

describe("Auth Actions", () => {
    const middlewares = [ thunk ];
    const mockStore = configureStore(middlewares);
    let url = urls.API_URL;

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

    it("#loginUser expected actions are dispatched on success", () => {
        let credentials = {email: "user@email.com", password: "password"};
        const payload = {token: "complex_user_token"};
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: payload,
            });
        });

        const expectedActions = [constants.LOGIN_USER, constants.LOGIN_SUCCESS];

        const store = mockStore();

        return store.dispatch(actions.loginUser(credentials)).then(() => {
            let storeActions = [];
            store.getActions().forEach((actions) => {
                storeActions.push(actions.type);
            });

            expect(storeActions).to.deep.equal(expectedActions);
        });
    });

    it("#loginUser expected actions are dispatched on failure", () => {
        let error = JSON.stringify({
            response: {
                data: {
                    message: "Error"
                }
            }
        });
        let credentials = {email: "user@email.com", password: "wrong_password"};
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 403,
                response: { message: error },
            });
        });

        const expectedActions = [constants.LOGIN_USER ,constants.LOGIN_FAILED];
        const store = mockStore();

        return store.dispatch(actions.loginUser(credentials)).then(() => {
            let storeActions = [];
            store.getActions().forEach((actions) => {
                storeActions.push(actions.type);
            });

            expect(storeActions).to.deep.equal(expectedActions);
        });
    });

    it("#loginRequest expected action is dispatched", () => {
        const expectedActions = {type: constants.LOGIN_USER};
        const store = mockStore();

        let result = store.dispatch(actions.loginRequest());

        expect(result).to.deep.equal(expectedActions);
    });

    it("#loginSuccess expected action is dispatched", () => {
        const payload = {token: "complex-token"};
        const expectedActions = {type: constants.LOGIN_SUCCESS, payload: payload};
        const store = mockStore();

        let result = store.dispatch(actions.loginSuccess(payload));

        expect(result).to.deep.equal(expectedActions);
    });

    it("#loginFailed expected action is dispatched", () => {
        const error = {error: "Error"};
        const expectedActions = {type: constants.LOGIN_FAILED, error: error};
        const store = mockStore();

        let result = store.dispatch(actions.loginFailed(error));

        expect(result).to.deep.equal(expectedActions);
    });
});