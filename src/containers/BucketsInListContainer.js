import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import BucketsInList from '../components/bucketlists/BucketsInList';
import EditBucketlist from '../components/bucketlists/EditBucketlist';
import DeleteBucketlist from '../components/bucketlists/DeleteBucketlist';
import * as bucketlistActions from '../actions/bucketlistActions';
import * as itemActions from '../actions/itemActions';

class BucketsInListContainer extends Component {
    handleOpen(bucketlist) {
        this.props.itemAction.loadItems(bucketlist.get("id"));
    }

    onChangeName(event) {
        let name = event.target.value;
        this.props.bucketlistAction.newBucketlistName(name);
    }

    //Edit Bucketlist
    handleEdit(bucketlist) {
        this.props.bucketlistAction.updateRequest(bucketlist);
    }

    handleEditClose() {
        this.props.bucketlistAction.closeEdit();
    }

    handleEditSubmit() {
        let name = this.props.bucketlistName;
        if (name < 1) {
            this.props.bucketlistAction.missingFields("Bucketlist name is required.");
        } else {
            let id = this.props.selectedBucketlist.get("id");
            let payload = {
                name: name
            };
            this.props.bucketlistAction.update(id, payload)
        }
    }

    //Delete Bucketlist
    handleDelete(bucketlist) {
        this.props.bucketlistAction.deleteRequest(bucketlist);
    }

    handleDeleteConfirm(bucketlist) {
        this.props.bucketlistAction.destroy(bucketlist.get("id"));
    }

    handleDeleteClose() {
        this.props.bucketlistAction.closeDelete();
    }

    render() {
        return (
            <div className="row">
                <div className="column">
                    <BucketsInList
                        totalItems={totalItems(this.props.bucketlist.get("items"))}
                        incompleteItems={incompleteItems(this.props.bucketlist.get("items"))}
                        completeItems={completeItems(this.props.bucketlist.get("items"))}
                        bucketlist={this.props.bucketlist}
                        handleEdit={this.handleEdit.bind(this, this.props.bucketlist)}
                        handleDelete={this.handleDelete.bind(this, this.props.bucketlist)}
                        handleOpen={this.handleOpen.bind(this, this.props.bucketlist)}
                    />
                    <EditBucketlist
                        handleEditClose={this.handleEditClose.bind(this)}
                        handleEditSubmit={this.handleEditSubmit.bind(this)}
                        onChangeName={this.onChangeName.bind(this)}
                        bucketlistName={this.props.bucketlistName}
                        modal={this.props.modal}
                    />
                    <DeleteBucketlist
                        handleDeleteConfirm={this.handleDeleteConfirm.bind(this, this.props.selectedBucketlist)}
                        handleDeleteClose={this.handleDeleteClose.bind(this)}
                        modal={this.props.modal}
                    />
                </div>
            </div>
        );
    }
}

function totalItems(items) {
    return items.size;
}

function completeItems(items) {
    let count = 0;
    items.forEach(item => {
        if (item.get("done"))
            count += 1;
    });
    return count;
}

function incompleteItems(items) {
    let count = 0;
    items.forEach(item => {
        if (item.get("done") === false)
            count += 1;
    });
    return count;
}

function mapStateToProps(state, prop) {
    return {
        selectedBucketlist: state.bucketlist.get("selectedBucketlist"),
        bucketlistName: state.bucketlist.get("bucketlistName"),
        modal: state.bucketlist
    }
}

function mapDispatchToProps(dispatch) {
    return {
        bucketlistAction: bindActionCreators(bucketlistActions, dispatch),
        itemAction: bindActionCreators(itemActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BucketsInListContainer)