import React from "react"
import { shallow } from "enzyme";
import { fromJS } from "immutable";
import BucketsInList from "../../../components/bucketlists/BucketsInList";

describe("BucketsInList", () => {
    let component;
    let bucketlist;
    let handleOpen;
    let handleEdit;
    let handleDelete;

    beforeEach(() => {
        bucketlist = fromJS({name: "Bucketlist name", id: 1, done: true});
        handleOpen = jest.fn();
        handleEdit = jest.fn();
        handleDelete = jest.fn();

        component = shallow(
            <BucketsInList
                bucketlist={bucketlist}
                handleOpen={handleOpen}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                totalItems={1}
                incompleteItems={0}
                completeItems={1}
            />
        )
    });

    it("should render component", () => {
        expect(component).toBeTruthy();
    });

    it("should display name of the bucketlist", () => {
        let bucketlist_name_display = component.find("h3.ui.header").first();
        expect(bucketlist_name_display.text()).toEqual("Bucketlist name");
    });

    it("should call #handleOpen when the open link is clicked", () => {
        let open_link = component.find("Link.basic.link").first();
        open_link.simulate("click");

        expect(handleOpen).toHaveBeenCalled();
    });

    it("should call #handleEdit when the edit link is clicked", () => {
        let edit_link = component.find("a.basic.link").first();
        edit_link.simulate("click");

        expect(handleEdit).toHaveBeenCalled()
    });

    it("should call #handleEdit when the edit link is clicked", () => {
        let delete_link = component.find("a.basic.link").at(1);
        delete_link.simulate("click");

        expect(handleDelete).toHaveBeenCalled()
    });

    it("should display the stats of the items attached to the bucketlist", () => {
        let total_items = component.find("div.value").first().text();
        let incomplete_items = component.find("div.value").at(1).text();
        let complete_items = component.find("div.value").at(2).text();

        expect([total_items, incomplete_items, complete_items]).toEqual(["1", "0", "1"]);
    });
});

