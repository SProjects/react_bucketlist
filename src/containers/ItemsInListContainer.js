import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as itemActions from '../actions/itemActions';

import ItemsInList from '../components/items/ItemsInList';
import EditItem from '../components/items/EditItem';
import DeleteItem from '../components/items/DeleteItem';

class ItemsInListContainer extends Component {
    onChangeName(event) {
        let name = event.target.value;
        this.props.itemAction.newItemName(name);
    }

    //Delete Item
    handleDelete(item) {
        this.props.itemAction.deleteRequest(item);
    }

    handleDeleteSubmit(item) {
        let bucketlist = this.props.bucketlist;
        this.props.itemAction.destroy(bucketlist, item);
    }

    handleDeleteClose() {
        this.props.itemAction.closeDelete();
    }

    //Edit Item
    handleEdit(item) {
        this.props.itemAction.editRequest(item);
    }

    handleComplete() {
        let bucketlist = this.props.bucketlist;
        let item = this.props.item;
        let status = true;
        this.props.itemAction.updateStatus(bucketlist, item, status);
    }

    handleInComplete() {
        let bucketlist = this.props.bucketlist;
        let item = this.props.item;
        let status = false;
        this.props.itemAction.updateStatus(bucketlist, item, status);
    }

    handleEditClose() {
        this.props.itemAction.closeEdit();
    }

    handleEditSubmit() {
        var name = this.props.itemName;
        if (name.length < 1) {
            this.props.itemAction.missingFields("Item name is required.");
        } else {
            let bucketlist = this.props.bucketlist;
            let id = this.props.selectedItem.get("id");
            let payload = {
                name: name
            };
            this.props.itemAction.update(bucketlist, id, payload);
        }
    }

    render() {
        return (
            <div className="column">
                <ItemsInList
                    item={this.props.item}
                    handleEdit={this.handleEdit.bind(this, this.props.item)}
                    handleDelete={this.handleDelete.bind(this, this.props.item)}
                    handleComplete={this.handleComplete.bind(this)}
                    handleInComplete={this.handleInComplete.bind(this)}
                />
                <EditItem
                    modal={this.props.modal}
                    handleEditClose={this.handleEditClose.bind(this)}
                    handleEditSubmit={this.handleEditSubmit.bind(this)}
                    onChangeName={this.onChangeName.bind(this)}
                    itemName={this.props.itemName}
                />
                <DeleteItem
                    handleDeleteClose={this.handleDeleteClose.bind(this)}
                    handleDeleteSubmit={this.handleDeleteSubmit.bind(this, this.props.item)}
                    modal={this.props.modal}
                />
            </div>
        );
    }
}

function mapStateToProps(state, prop) {
    return {
        selectedItem: state.item.get("selectedItem"),
        modal: state.item,
        itemName: state.item.get("itemName")
    }
}

function mapDispatchToProps(dispatch) {
    return {
        itemAction: bindActionCreators(itemActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsInListContainer)
