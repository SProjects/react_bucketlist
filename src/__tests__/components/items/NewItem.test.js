import React from "react";
import { shallow } from "enzyme";
import { fromJS } from "immutable";
import NewItem from "../../../components/items/NewItem";

describe("NewItem", () => {
	let component;
	let itemName;
	let modal;
	let onChangeName;
	let handleCreateSubmit;
	let handleCreateClose;

	beforeEach(() => {
		itemName = "";
		onChangeName = jest.fn();
		handleCreateSubmit = jest.fn();
		handleCreateClose = jest.fn();
		modal = fromJS(
			{showCreate: true}
		);

		component = shallow(
			<NewItem
				itemName={itemName}
				modal={modal}
				onChangeName={onChangeName}
				handleCreateSubmit={handleCreateSubmit}
				handleCreateClose={handleCreateClose}
			/>
		);
	});

	it("should render component", () => {
		expect(component).toBeTruthy();
	});

	it("should call #onChangeName when onChange event is called on the input field", () => {
		let input_field = component.find("input").first();
		input_field.simulate("change", { target: {value: "New Item Name"} });

		expect(onChangeName).toHaveBeenCalled();
	});

	it("should call #handleCreateSubmit when 'Save' button is clicked", () => {
		let save_button = component.find("Button.ui.violet.button").first();
		save_button.simulate("click");

		expect(handleCreateSubmit).toHaveBeenCalled();
	});

	it("should call #handleCreateClose when 'Close' button is clicked", () => {
		let close_button = component.find("Button").first();
		close_button.simulate("click");

		expect(handleCreateClose).toHaveBeenCalled();
	});
});

