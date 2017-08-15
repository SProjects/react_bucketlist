import React from "react"
import { shallow } from "enzyme";
import NoBucketlists from "../../../components/bucketlists/NoBucketlists";

describe("NoBucketlists", () => {
    let component;

    beforeEach(() => {
        component = shallow(<NoBucketlists/>);
    });

    it("should render component", () => {
        expect(component).toBeTruthy();
        expect(component.find("div.ui.basic.message").first().text()).toContain("No bucketlists to display.");
    });
});
