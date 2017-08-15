import React from "react"
import { shallow } from "enzyme";
import { fromJS } from "immutable";
import DeleteItem from "../../../components/items/DeleteItem";

describe("DeleteItem", () => {
    let component;
    let handleDeleteSubmit;
    let handleDeleteClose;
    let modal;


    beforeEach(() => {
        handleDeleteSubmit = jest.fn();
        handleDeleteClose = jest.fn();
        modal = fromJS(
            {showDelete: true}
        );

        component = shallow(
            <DeleteItem
                modal={modal}
                handleDeleteSubmit={handleDeleteSubmit}
                handleDeleteClose={handleDeleteClose}
            />
        );
    });

    it("should render component", () => {
        expect(component).toBeTruthy();
    });

    it("should call #handleDeleteSubmit when 'Confirm' button is clicked", () => {
        let confirm_button = component.find("Button").first();
        confirm_button.simulate("click");

        expect(handleDeleteSubmit).toHaveBeenCalled();
    });

    it("should call #handleDeleteClose when 'Nope' button is clicked", () => {
        let abort_button = component.find("Button.ui.violet.button").first();
        abort_button.simulate("click");

        expect(handleDeleteClose).toHaveBeenCalled();
    });
});