import React from "react";
import { shallow } from "enzyme";
import { fromJS } from "immutable";
import EditBucketlist from "../../../components/bucketlists/EditBucketlist";

describe("EditBucketlist", () => {
	let component;
	let handleEditSubmit;
	let handleEditClose;
	let modal;
	let bucketlistName;
	let onChangeName;

	beforeEach(() => {
		handleEditSubmit = jest.fn();
		handleEditClose = jest.fn();
		onChangeName = jest.fn();
		bucketlistName = "Bucketlist Name";
		modal = fromJS({
			showEdit: true
		});

		component = shallow(
			<EditBucketlist
				modal={modal}
				bucketlistName={bucketlistName}
				onChangeName={onChangeName}
				handleEditSubmit={handleEditSubmit}
				handleEditClose={handleEditClose}
			/>
		);
	});

	it("should render component", () => {
		expect(component).toBeTruthy();
	});

	it("should call #handleEditClose when 'Close' button is clicked", () => {
		let confirm_delete = component.find("Button").first();
		confirm_delete.simulate("click");

		expect(handleEditClose).toHaveBeenCalled();
	});

	it("should call #handleEditSubmit when 'Update' button is clicked", () => {
		let update_button = component.find("Button.ui.violet.button").first();
		update_button.simulate("click");

		expect(handleEditSubmit).toHaveBeenCalled();
	});

	it("should call #onChangeName when the onChange event is called on the input field", () => {
		let name_input = component.find("input").first();
		name_input.simulate("change", { target: {value: "Updated Bucketlist Name"}});

		expect(onChangeName).toHaveBeenCalled();
	});
});