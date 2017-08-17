import React from "react"
import { shallow, } from "enzyme";
import { fromJS } from "immutable";
import Bucketlists from "../../../components/bucketlists/Bucketlists";
import BucketsInListContainer from "../../../containers/BucketsInListContainer";

describe("Bucketlists", () => {
    let handleCreate;
    let handleSearch;
    let handlePreviousNav;
    let previousPresent;
    let handleNextNav;
    let nextPresent;
    let bucketlists;
    let bucketsInList;

    describe("Bucketlist component with an array of bucketlist to display", () => {
        let component;

        beforeEach(() => {
            handleCreate = jest.fn();
            handleSearch = jest.fn();
            handlePreviousNav = jest.fn();
            previousPresent = "link/to/next/bucketlists";
            handleNextNav = jest.fn();
            nextPresent = "link/to/previous/bucketlists";
            bucketlists = fromJS([{id: 1, name: "Bucketlist 1"}, {id: 2, name: "Bucketlist 2"}]);
            bucketsInList = bucketlists.map(bucketlist => {
                return <BucketsInListContainer
                    key={bucketlist.get("id")}
                    bucketlist={bucketlist}
                />
            });

            component = shallow(
                <Bucketlists
                    handleCreate={handleCreate}
                    handleSearch={handleSearch}
                    handlePreviousNav={handlePreviousNav}
                    previousPresent={previousPresent}
                    handleNextNav={handleNextNav}
                    nextPresent={nextPresent}
                    bucketlists={bucketlists}
                    bucketsInList={bucketsInList}
                />
            );
        });

        it("should render component", () => {
            expect(component).toBeTruthy();
        });

        it("should call #handlePreviousNav when 'previous' anchor link is clicked", () => {
            let previous_link = component.find("a.ui.tiny.violet.button").first();
            previous_link.simulate("click");

            expect(handlePreviousNav).toHaveBeenCalled();
        });

        it("should call #handleNextNav when 'next' anchor link is clicked", () => {
            let next_link = component.find("a.ui.tiny.violet.button").at(1);
            next_link.simulate("click");

            expect(handleNextNav).toHaveBeenCalled();
        });

        it("should call #handleSearch when onKeyUp event occurs on the search field", () => {
            let search_input = component.find("input").first();
            search_input.simulate("keyUp", { target: {value: "term"} });

            expect(handleSearch).toHaveBeenCalled();
        });

        it("should call #handleCreate when 'Add' link is clicked", () => {
            let add_link = component.find("a.ui.tiny.violet.circular.button").first();
            add_link.simulate("click");

            expect(handleCreate).toHaveBeenCalled();
        });

        it("should render BucketsInListContainer component", () => {
            expect(component.find("BucketsInListContainer").first().length).toEqual(1);
        });
    });

    // describe("Bucketlist component with an empty list of bucketlists", () => {
    //     let component;
    //
    //     beforeEach(() => {
    //         handleCreate = jest.fn();
    //         handleSearch = jest.fn();
    //         handlePreviousNav = null;
    //         previousPresent = false;
    //         handleNextNav = null;
    //         nextPresent = false;
    //         bucketlists = List();
    //         bucketsInList = null
    //         });
    //
    //         component = mount(
    //             <Bucketlists
    //                 handleCreate={handleCreate}
    //                 handleSearch={handleSearch}
    //                 handlePreviousNav={handlePreviousNav}
    //                 previousPresent={previousPresent}
    //                 handleNextNav={handleNextNav}
    //                 nextPresent={nextPresent}
    //                 bucketlists={bucketlists}
    //                 bucketsInList={bucketsInList}
    //             />
    //         );
    //
    //     it("should render NoBucketlist component", () => {
    //         expect(component.find("NoBucketlist").first().length).toEqual(1);
    //     });
    //
    //     it("should have disabled 'next' and 'previous' links", () => {
    //         expect(component.find("a.ui.tiny.violet.button.disabled").first()).toBeTruthy();
    //         expect(component.find("a.ui.tiny.violet.button.disabled").at(1)).toBeTruthy();
    //     });
    //
    //     it("should render BucketsInListContainer component", () => {
    //         expect(component.find("BucketsInListContainer").first().length).toEqual(0);
    //     })
    // });

});