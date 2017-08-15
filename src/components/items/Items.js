import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Items = (props) => (
    <div className="Items">
        <div className="ui main container">
            <div className="column">
                <div className="ui grid">

                    <div className="row">
                        <div className="six wide column">
                                <span className="ui header">
                                    {props.bucketlistName}
                            </span>
                        </div>
                        <div className="right aligned ten wide column">
                            <Link to="/" className="ui tiny violet button">
                                <i className="caret left icon"/>
                                Back
                            </Link>
                        </div>
                    </div>

                    <div className="ui divider"></div>

                    <div className="row">
                        <div className="sixteen wide column">
                            <a className="ui tiny violet circular button"
                               onClick={props.handleNewItem}>
                                <i className="plus icon"/>
                                Add
                            </a>
                        </div>
                    </div>

                    <div className="row">
                        { props.itemsPresent ?
                            <div className="sixteen wide column">
                                <div className="ui basic message">
                                    No items to display.
                                </div>
                            </div>
                            :
                            <div className="ui three column grid">
                                {props.itemsInList}
                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    </div>
);

Items.protoTypes = {
    bucketlistName: PropTypes.string.isRequired,
    handleNewItem: PropTypes.func.isRequired,
    itemsPresent: PropTypes.bool.isRequired,
    itemsInList: PropTypes.object
};

export default Items
