import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import EditBucketlist from './EditBucketlist';
import DeleteBucketlist from './DeleteBucketlist';
import * as bucketlistActions from '../../actions/bucketlistActions';
import * as itemActions from '../../actions/itemActions';

class BucketsInList extends Component {
    handleEdit(bucketlist) {
        this.props.bucketlistAction.updateRequest(bucketlist);
    }

    handleDelete(bucketlist) {
        this.props.bucketlistAction.deleteRequest(bucketlist);
    }

    handleOpen(bucketlist) {
        this.props.itemAction.loadItems(bucketlist);
    }

    render() {
        return (
                <div className="row">
                    <div className="column">
                        <div className="ui clearing purple segment">
                            <div className="ui grid">
                                <div className="row">
                                    <div className="six wide column">
                                        <h3 className="ui header">{this.props.bucketlist.get("name")}</h3>
                                    </div>
                                    <div className="right aligned ten wide column">
                                        <Link to={"/bucketlists/" + this.props.bucketlist.get("id") + "/items"}
                                              className="basic link" title="Open"
                                              onClick={this.handleOpen.bind(this, this.props.bucketlist)}>
                                            <i className="folder open outline black icon"></i>
                                        </Link>
                                        <a className="basic link" title="Edit"
                                           onClick={this.handleEdit.bind(this, this.props.bucketlist)}>
                                            <i className="edit black icon"></i>
                                        </a>
                                        <a className="basic link confirm-bucketlist-delete" title="Delete"
                                           onClick={this.handleDelete.bind(this, this.props.bucketlist)}>
                                            <i className="trash black icon"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="column">
                                        <div className="ui three tiny statistics">
                                            <div className="statistic">
                                                <div className="value">
                                                    {totalItems(this.props.bucketlist.get("items"))}
                                                </div>
                                                <div className="label">
                                                    Total
                                                </div>
                                            </div>
                                            <div className="statistic">
                                                <div className="value">
                                                    {incompleteItems(this.props.bucketlist.get("items"))}
                                                </div>
                                                <div className="label">
                                                    Unfinished
                                                </div>
                                            </div>
                                            <div className="statistic">
                                                <div className="value">
                                                    {completeItems(this.props.bucketlist.get("items"))}
                                                </div>
                                                <div className="label">
                                                    Finished
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <EditBucketlist/>
                        <DeleteBucketlist/>
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
        state: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        bucketlistAction: bindActionCreators(bucketlistActions, dispatch),
        itemAction: bindActionCreators(itemActions, dispatch)
    }
}

withRouter(BucketsInList);
export default connect(mapStateToProps, mapDispatchToProps)(BucketsInList)