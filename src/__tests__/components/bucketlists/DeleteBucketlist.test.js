import React from "react";
import { shallow } from "enzyme";
import { fromJS } from "immutable";
import DeleteBucketlist from "../../../components/bucketlists/DeleteBucketlist";

describe("DeleteBucketlist", () => {
	let component;
	let handleDeleteConfirm;
	let handleDeleteClose;
	let modal;

	beforeEach(() => {
		handleDeleteConfirm = jest.fn();
		handleDeleteClose = jest.fn();
		modal = fromJS({
			showDelete: true
		});

		component = shallow(
			<DeleteBucketlist
				modal={modal}
				handleDeleteConfirm={handleDeleteConfirm}
				handleDeleteClose={handleDeleteClose}
			/>
		);
	});

	it("should render component", () => {
		expect(component).toBeTruthy();
	});

	it("should call #handleDeleteConfirm when 'Confirm' button is clicked", () => {
		let confirm_delete = component.find("Button").first();
		confirm_delete.simulate("click");

		expect(handleDeleteConfirm).toHaveBeenCalled();
	});

	it("should call #handleDeleteClose when 'Nope' button is clicked", () => {
		let abort_delete = component.find("Button.ui.violet.button").first();
		abort_delete.simulate("click");

		expect(handleDeleteClose).toHaveBeenCalled();
	});
});