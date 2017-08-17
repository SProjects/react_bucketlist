import React from "react";
import { shallow } from "enzyme";

import Header from "../../components/Header";

describe("HeaderContainer", () => {
	let component;
	let onUserEdit;
	let onLogout;

	beforeEach(() => {
		onLogout = jest.fn();
		onUserEdit = jest.fn();
		component = shallow(
			<Header firstName="First" onLogout={onLogout} onUserEdit={onUserEdit}/>
		);
	});

	it("should render the HeaderContainer component", () => {
		expect(component).toBeTruthy();
	});

	it("should contain the logged in user's first_name", () => {
		expect(component.find("div.ui.simple.dropdown.item").text()).toContain("First");
	});

	it("should call #onUserEdit when Account Settings link is clicked", () => {
		let account_settings_anchor = component.find("a.item").first();
		expect(account_settings_anchor.text()).toContain("Account settings");

		account_settings_anchor.simulate("click");
		expect(onUserEdit).toHaveBeenCalled();
	});

	it("should call #onLogout when Logout link is clicked", () => {
		let logout_anchor = component.find("a.item").at(1);
		expect(logout_anchor.text()).toContain("Logout");

		logout_anchor.simulate("click");
		expect(onLogout).toHaveBeenCalled();
	});
});