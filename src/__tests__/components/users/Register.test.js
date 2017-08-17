import React from "react"
import { shallow, mount } from "enzyme";
import { fromJS } from "immutable";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { Register } from "../../../components/users/Register";

describe("Register", () => {
    let component;
    let middleware = [];
    let mockStore = configureStore(middleware);
    let handleSubmit;

    beforeEach(() => {
        let initialState = fromJS({
            auth: {
                isLoggedIn: false
            }
        });
        let store = mockStore(initialState);

        component = shallow(
            <Provider store={store}>
                <Register />
            </Provider>
        );
    });

    it("should render component", () => {
        expect(component.find("Register").length).toEqual(1);
    });

    xit("should call #handleSubmit when the submit button is clicked", () => {
        let handleSubmit = jest.fn();
        let submit_button = component.find("Register").first().find('Button[type="submit"]').first();
        submit_button.simulate("click");

        // expect(handleSubmit).toHaveBeenCalled()
    });
});