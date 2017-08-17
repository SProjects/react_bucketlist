import React from "react";
import { fromJS } from "immutable";
import { expect } from "chai";
import moxios from "moxios";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as actions from "../../actions/itemActions";
import * as constants from "../../constants";
import * as headerUtils from "../../utilities/headers";

describe("Item Actions", () => {
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

	it("#loadItems on success", () => {
		const payload = {id: 1, first_name: "First"};
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: payload
			});
		});

		let expectedActions = [
			constants.ITEMS_CLEARS_MESSAGES, constants.ITEMS_REQUEST
		];
		let store = mockStore();

		return store.dispatch(actions.loadItems()).then(() => {
			let storeActions = [];
			store.getActions().forEach((actions) => {
				storeActions.push(actions.type);
			});

			expect(storeActions).to.deep.equal(expectedActions);
		});
	});

	it("#update on success", () => {
		const bucketlist = fromJS({id: 1, name: "Bucketlist Name"});
		const item_id = 2;
		const payload = {name: "Updated Item Name"};
		const payload_response = {id: item_id, name: "Updated Item Name"};
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: payload_response
			});
		});

		let expectedActions = [
			constants.ITEMS_UPDATED, constants.ITEMS_EDIT_CLOSE
		];
		let store = mockStore();

		return store.dispatch(actions.update(bucketlist, item_id, payload)).then(() => {
			let storeActions = [];
			store.getActions().forEach((actions) => {
				storeActions.push(actions.type);
			});

			expect(storeActions).to.deep.equal(expectedActions);
		});
	});

	it("#create on success", () => {
		const bucketlist = fromJS({id: 1, name: "Bucketlist Name"});
		const payload = {name: "New Item Name"};
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {message: "Created"}
			});
		});

		let expectedActions = [
			constants.ITEMS_CREATED, constants.ITEMS_CREATE_CLOSE
		];
		let store = mockStore();

		return store.dispatch(actions.create(bucketlist, payload)).then(() => {
			let storeActions = [];
			store.getActions().forEach((actions) => {
				storeActions.push(actions.type);
			});

			expect(storeActions).to.deep.equal(expectedActions);
		});
	});

	it("#destroy on success", () => {
		const bucketlist = fromJS({id: 1, name: "Bucketlist Name"});
		const item = fromJS({id: 2, name: "Item Name"});
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {message: "Deleted"}
			});
		});

		let expectedActions = [constants.ITEMS_DELETED];
		let store = mockStore();

		return store.dispatch(actions.destroy(bucketlist, item)).then(() => {
			let storeActions = [];
			store.getActions().forEach((actions) => {
				storeActions.push(actions.type);
			});

			expect(storeActions).to.deep.equal(expectedActions);
		});
	});
});