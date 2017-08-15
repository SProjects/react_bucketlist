import React from "react"
import { shallow } from "enzyme";

import Loading from "../../components/Loading";

describe("Loading", () => {
    let component;

    beforeEach(() => {
        component = shallow(<Loading/>)
    });

    it("should render component", () => {
        expect(component).toBeTruthy();
        expect(component.find("div.ui.medium.text.loader").first().text()).toEqual("Loading");
    });
});