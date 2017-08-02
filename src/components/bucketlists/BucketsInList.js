import React, {Component} from 'react';

class BucketsInList extends Component {
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
                                    <a className="basic link"
                                       title="Open">
                                        <i className="folder open outline black icon"></i>
                                    </a>
                                    <a className="basic link" title="Edit">
                                        <i className="edit black icon"></i>
                                    </a>
                                    <a className="basic link confirm-bucketlist-delete" title="Delete">
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
    items.map(item => {
        if (item.get("done"))
            count += 1;
    });
    return count;
}

function incompleteItems(items) {
    let count = 0;
    items.map(item => {
        if (item.get("done") === false)
            count += 1;
    });
    return count;
}

export default BucketsInList