import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import thunk from "redux-thunk";
import { fromJS } from "immutable";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import HeaderContainer from "../../containers/HeaderContainer";

describe("HeaderContainer", () => {
	const middlewares = [thunk];
	const mockStore = configureStore(middlewares);
	let headerContainer;
	let store;


	beforeEach(() => {
		const initialState = {
			header: fromJS({user: {first_name: "First"}})
		};

		global.localStorage = jest.genMockFunction();
		global.localStorage.setItem = jest.genMockFunction();
		global.localStorage.getItem = jest.genMockFunction();

		store = mockStore(initialState);

		headerContainer = shallow(
			<Provider store={store}>
				<HeaderContainer/>
			</Provider>
		);
	});

	it("should render HeaderContainer", () => {
		expect(headerContainer).toBeTruthy();
	});

	it("should contain the Header component", () => {
		expect(headerContainer.find("Header")).toBeTruthy();
	});

	xit("should capture snapshot of HeaderContainer", () => {
		const renderedContainer = renderer.create(<HeaderContainer store={store}/>);

		expect(renderedContainer).toMatchSnapshot();
	});
});