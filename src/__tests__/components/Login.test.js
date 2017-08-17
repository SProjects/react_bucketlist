import React from "react";
import { shallow } from "enzyme";

import Login from "../../components/Login";

describe("Login", () => {
	let component;
	let onSignIn;
	let clearRegMessages;
	let onEmailChange;
	let onPasswordChange;

	beforeEach(() => {
		onSignIn = jest.fn();
		clearRegMessages = jest.fn();
		onEmailChange = jest.fn();
		onPasswordChange = jest.fn();

		component = shallow(
			<Login
				onSignIn={onSignIn}
				clearRegMessages={clearRegMessages}
				onEmailChange={onEmailChange}
				onPasswordChange={onPasswordChange}
				username=''
				password=''
			/>
		);
	});

	it("should render component", () => {
		expect(component).toBeTruthy();
	});

	it("should render two input fields", () => {
		expect(component.find("input").length).toEqual(2);
	});

	it("should call #onEmailChange when the onChange event is fired by the email input field", () => {
		let email_input = component.find("input").first();
		email_input.simulate("change", { target: {value: "fake@email.com"} });

		expect(onEmailChange).toHaveBeenCalled();
	});

	it("should call #onPasswordChange when the onChange event is fired by the password input field", () => {
		let password_field = component.find("input").at(1);
		password_field.simulate("change", { target: {value: "fakepassword"} });

		expect(onPasswordChange).toHaveBeenCalled();
	});

	it("should call #onSignIn when the sign in button is clicked", () => {
		let signin_button = component.find("Button.ui.green.fluid.button").first();
		signin_button.simulate("click");

		expect(onSignIn).toHaveBeenCalled();
	});

	it("should call #clearRegMessages when the anchor link to registration page is clicked", () => {
		let registration_link = component.find("Link").first();
		registration_link.simulate("click");

		expect(clearRegMessages).toHaveBeenCalled();
	});
});