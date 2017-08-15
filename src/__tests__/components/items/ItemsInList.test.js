import React from "react"
import { shallow } from "enzyme";
import { fromJS } from "immutable";
import ItemsInList from "../../../components/items/ItemsInList";

describe("ItemsInList", () => {
    let component;
    let handleEdit;
    let handleDelete;
    let handleInComplete;
    let handleComplete;
    let item;
    let today;

    describe("Incomplete Item", () => {
        beforeEach(() => {
            handleEdit = jest.fn();
            handleDelete = jest.fn();
            handleInComplete = jest.fn();
            handleComplete = jest.fn();

            today = new Date();
            item = fromJS({id: 1, name: "Item Name", done: false, date_created: today.toDateString()});

            component = shallow(
                <ItemsInList
                    item={item}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleInComplete={handleInComplete}
                    handleComplete={handleComplete}
                />
            );
        });

        it("should render component", () => {
            expect(component).toBeTruthy();
        });

        it("should call #handleComplete when green check icon is clicked", () => {
            let incomplete_icon = component.find("i.right.floated.check.green.icon").first();
            incomplete_icon.simulate("click");

            expect(handleComplete).toHaveBeenCalled();
        });

        it("should call #handleEdit when edit icon is clicked", () => {
            let edit_icon = component.find("i.right.floated.edit.black.icon").first();
            edit_icon.simulate("click");

            expect(handleEdit).toHaveBeenCalled();
        });

        it("should call #handleDelete when delete icon is clicked", () => {
            let delete_icon = component.find("i.right.floated.trash.black.icon").first();
            delete_icon.simulate("click");

            expect(handleDelete).toHaveBeenCalled();
        });
    });

    describe("Complete Item", () => {
        beforeEach(() => {
            handleEdit = jest.fn();
            handleDelete = jest.fn();
            handleInComplete = jest.fn();
            handleComplete = jest.fn();

            today = new Date();
            item = fromJS({id: 1, name: "Item Name", done: true, date_created: today.toDateString()});

            component = shallow(
                <ItemsInList
                    item={item}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleInComplete={handleInComplete}
                    handleComplete={handleComplete}
                />
            );
        });

        it("should call #handleInComplete when grey check icon is clicked", () => {
            let complete_icon = component.find("i.right.floated.check.grey.icon").first();
            complete_icon.simulate("click");

            expect(handleInComplete).toHaveBeenCalled();
        });

        it("should not be able to call #handleComplete", () => {
            let incomplete_icon = component.find("i.right.floated.check.green.icon").first();
            incomplete_icon.simulate("click");

            expect(handleComplete).not.toHaveBeenCalled();
        });
    });
});