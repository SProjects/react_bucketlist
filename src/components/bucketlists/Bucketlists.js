import React from 'react';
import PropTypes from 'prop-types';

import NoBucketlists from './NoBucketlists';
import Toaster from '../Toaster';

const Bucketlists = (props) => (
    <div className="Bucketlists">
        <div className="ui main container">
            <div className="column">

                <div className="ui grid">

                    <div className="row">
                        <div className="six wide column">
                                    <span className="ui header">
                                        Your Bucketlists
                                    </span>
                        </div>
                        <div className="right aligned ten wide column">
                            {props.previousPresent ?
                                <a className="ui tiny violet button"
                                   onClick={props.handlePreviousNav}>
                                    <i className="caret left icon"/>
                                    Previous
                                </a>
                                :
                                <a className="ui tiny violet button disabled">
                                    <i className="caret left icon"/>
                                    Previous
                                </a>
                            }

                            {props.nextPresent ?
                                <a className="ui tiny violet button"
                                   onClick={props.handleNextNav}>
                                    Next
                                    <i className="caret right icon"/>
                                </a>
                                :
                                <a className="ui tiny violet button disabled">
                                    Next
                                    <i className="caret right icon"/>
                                </a>
                            }
                        </div>
                    </div>

                    <div className="ui divider"></div>

                    <div className="row">
                        <div className="twelve wide column">
                            <a className="ui tiny violet circular button"
                               onClick={props.handleCreate}>
                                <i className="plus icon"/>
                                Add
                            </a>
                        </div>
                        <div className="four wide column right aligned">
                            <div className="ui fluid search left icon input">
                                <i className="search icon"/>
                                <input placeholder="Search by name" onKeyUp={props.handleSearch}/>
                            </div>
                        </div>
                    </div>
                    { !props.bucketlists.toJS().length ? <NoBucketlists /> : null }

                    { props.bucketsInList }
                </div>
            </div>
        </div>
        <Toaster/>
    </div>
);

Bucketlists.propTypes = {
    previousPresent: PropTypes.string,
    handlePreviousNav: PropTypes.func,
    nextPresent: PropTypes.string,
    handleNextNav: PropTypes.func,
    handleCreate: PropTypes.func,
    handleSearch: PropTypes.func,
    bucketlists: PropTypes.object,
    bucketsInList: PropTypes.object
};

export default Bucketlists
