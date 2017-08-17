import React from "react";
import { shallow } from "enzyme";
import { fromJS } from "immutable";
import Items from "../../../components/items/Items";
import ItemsInListContainer from "../../../containers/ItemsInListContainer";

describe("Items", () => {
	let component;
	let bucketlistName;
	let handleNewItem;
	let itemsPresent;
	let items;
	let itemsInList;
	let bucketlist;
	let name = "Selected Bucketlist";

	beforeEach(() => {
		bucketlistName = name;
		itemsPresent = true;
		handleNewItem = jest.fn();

		items = fromJS([{id: 1, name: "Item Name", done: false}]);
		bucketlist = fromJS({id: 1, name: name, items: [items]});
		itemsInList = items.map(item => {
			return (
				<ItemsInListContainer
					key={item.get("id")}
					item={item}
					bucketlist={bucketlist}
				/>
			);
		});

		component = shallow(
			<Items
				bucketlistName={bucketlistName}
				handleNewItem={handleNewItem}
				itemsPresent={itemsPresent}
				itemsInList={itemsInList}
			/>
		);
	});

	it("should render component", () => {
		expect(component).toBeTruthy();
	});

	it("should bucketlist name to which the items belong", () => {
		let bucketlist_name_span = component.find("span.ui.header").first();

		expect(bucketlist_name_span.text()).toEqual(name);
	});

	it("should call #handleNewItem when the 'Add' link is clicked", () => {
		let add_item_button = component.find("a.ui.tiny.violet.circular.button").first();
		add_item_button.simulate("click");

		expect(handleNewItem).toHaveBeenCalled();
	});

	it("should contain an ItemsInListContainer component to display the items", () => {
		expect(component.find("ItemsInListContainer").first()).toBeTruthy();
	});
});