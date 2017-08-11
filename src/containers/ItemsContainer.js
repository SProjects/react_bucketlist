import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as bucketlistActions from '../actions/bucketlistActions';
import * as itemActions from '../actions/itemActions';

import HeaderContainer from '../containers/HeaderContainer';
import ItemsInListContainer from '../containers/ItemsInListContainer';
import Loading from '../components/Loading';
import Items from '../components/items/Items';
import NewItem from '../components/items/NewItem';


class ItemsContainer extends Component {
    componentWillMount() {
        let bucketlist_id = this.props.match.params.id;
        this.props.itemAction.loadItems(bucketlist_id);
    }

    handleNewItem(event) {
        this.props.itemAction.newItemRequest();
        event.preventDefault();
    }

    onChangeName(event) {
        let name = event.target.value;
        this.props.itemAction.newItemName(name);
    }

    //Create Item
    handleCreateClose() {
        this.props.itemAction.closeCreate();
    }

    handleCreateSubmit() {
        let name = this.props.itemName;
        if (name < 1) {
            this.props.itemAction.missingFields("Item name is required.");
        } else {
            let bucketlist = this.props.item.get("bucketlist");
            let payload = {
                name: name
            };
            this.props.itemAction.create(bucketlist, payload);
        }
    }

    render() {
        if (this.props.loading) {
            return (
                <Loading/>
            );
        }

        let itemsInList = this.props.item.get("items").map(item => {
            return (
                <ItemsInListContainer
                    key={item.get("id")}
                    item={item}
                    bucketlist={this.props.item.get("bucketlist")}
                />
            )
        });

        return (
            <div>
                <HeaderContainer/>
                <Items
                    bucketlistName={this.props.item.get("bucketlist").get("name")}
                    itemsPresent={this.props.item.get("items").size === 0}
                    itemsInList={itemsInList}
                    handleNewItem={this.handleNewItem.bind(this)}
                />
                <NewItem
                    handleCreateClose={this.handleCreateClose.bind(this)}
                    handleCreateSubmit={this.handleCreateSubmit.bind(this)}
                    onChangeName={this.onChangeName.bind(this)}
                    itemName={this.props.itemName}
                    modal={this.props.item}
                />
            </div>
        );

    }
}

function mapStateToProps(state, prop) {
    return {
        firstName: state.header.get("user").first_name,
        itemName: state.item.get("itemName"),
        loading: state.item.get("loading"),
        item: state.item
    }
}

function mapDispatchToProps(dispatch) {
    return {
        itemAction: bindActionCreators(itemActions, dispatch),
        bucketlistAction: bindActionCreators(bucketlistActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);