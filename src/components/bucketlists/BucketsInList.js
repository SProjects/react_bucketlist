import React from 'react';
import { Link } from 'react-router-dom'

const BucketsInList = (props) => (
    <div>
        <div className="ui clearing purple segment">
            <div className="ui grid">
                <div className="row">
                    <div className="six wide column">
                        <h3 className="ui header">{props.bucketlist.get("name")}</h3>
                    </div>
                    <div className="right aligned ten wide column">
                        <Link to={"/bucketlists/" + props.bucketlist.get("id") + "/items"}
                              className="basic link" title="Open"
                              onClick={props.handleOpen}>
                            <i className="folder open outline black icon"/>
                        </Link>
                        <a className="basic link" title="Edit"
                           onClick={props.handleEdit}>
                            <i className="edit black icon"/>
                        </a>
                        <a className="basic link confirm-bucketlist-delete" title="Delete"
                           onClick={props.handleDelete}>
                            <i className="trash black icon"/>
                        </a>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <div className="ui three tiny statistics">
                            <div className="statistic">
                                <div className="value">
                                    {props.totalItems}
                                </div>
                                <div className="label">
                                    Total
                                </div>
                            </div>
                            <div className="statistic">
                                <div className="value">
                                    {props.incompleteItems}
                                </div>
                                <div className="label">
                                    Unfinished
                                </div>
                            </div>
                            <div className="statistic">
                                <div className="value">
                                    {props.completeItems}
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
);

export default BucketsInList;