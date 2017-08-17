import React from "react";
import { shallow } from "enzyme";
import { fromJS } from "immutable";
import EditItem from "../../../components/items/EditItem";

describe("EditItem", () => {
	let component;
	let itemName;
	let modal;
	let onChangeName;
	let handleEditSubmit;
	let handleEditClose;

	beforeEach(() => {
		itemName = "Item Name";
		onChangeName = jest.fn();
		handleEditSubmit = jest.fn();
		handleEditClose = jest.fn();
		modal = fromJS(
			{showEdit: true}
		);

		component = shallow(
			<EditItem
				itemName={itemName}
				modal={modal}
				onChangeName={onChangeName}
				handleEditSubmit={handleEditSubmit}
				handleEditClose={handleEditClose}
			/>
		);
	});

	it("should render component", () => {
		expect(component).toBeTruthy();
	});

	it("should call #onChangeName when onChange event is called on the input field", () => {
		let input_field = component.find("input").first();
		input_field.simulate("change", { target: {value: "Updated Item Name"} });

		expect(onChangeName).toHaveBeenCalled();
	});

	it("should call #handleEditSubmit when 'Update' button is clicked", () => {
		let save_button = component.find("Button.ui.violet.button").first();
		save_button.simulate("click");

		expect(handleEditSubmit).toHaveBeenCalled();
	});

	it("should call #handleEditClose when 'Close' button is clicked", () => {
		let close_button = component.find("Button").first();
		close_button.simulate("click");

		expect(handleEditClose).toHaveBeenCalled();
	});
});