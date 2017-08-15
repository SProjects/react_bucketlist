import React from "react"
import { shallow } from "enzyme";
import { fromJS } from "immutable";
import NewBucketlist from "../../../components/bucketlists/NewBucketlist";

describe("NewBucketlist", () => {
    let component;
    let handleCreateSubmit;
    let handleCreateClose;
    let modal;
    let bucketlistName;
    let onChangeName;

    beforeEach(() => {
        handleCreateClose = jest.fn();
        handleCreateSubmit = jest.fn();
        onChangeName = jest.fn();
        bucketlistName = "";
        modal = fromJS({
            showCreate: true
        });

        component = shallow(
            <NewBucketlist
                modal={modal}
                bucketlistName={bucketlistName}
                onChangeName={onChangeName}
                handleCreateSubmit={handleCreateSubmit}
                handleCreateClose={handleCreateClose}
            />
        );
    });

    it("should render component", () => {
        expect(component).toBeTruthy();
    });

    it("should call #handleCreateClose when 'Close' button is clicked", () => {
        let confirm_delete = component.find("Button").first();
        confirm_delete.simulate("click");

        expect(handleCreateClose).toHaveBeenCalled();
    });

    it("should call #handleCreateSubmit when 'Save' button is clicked", () => {
        let save_button = component.find("Button.ui.violet.button").first();
        save_button.simulate("click");

        expect(handleCreateSubmit).toHaveBeenCalled();
    });

    it("should call #onChangeName when the onChange event is called on the input field", () => {
        let name_input = component.find("input").first();
        name_input.simulate("change", { target: {value: "New Bucketlist Name"}});

        expect(onChangeName).toHaveBeenCalled();
    })
});