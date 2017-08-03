import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import * as bucketlistActions from '../../actions/bucketlistActions';
import * as utils from '../../utilities/tokenUtilities';
import NoBucketlists from './NoBucketlists';
import BucketsInList from './BucketsInList';
import NewBucketlist from './NewBucketlist';

class Bucketlists extends Component {
    componentWillMount() {
        this.props.bucketlistAction.getBucketlists();
    }

    componentDidMount() {
        this.props.bucketlistAction.getBucketlists();
    }

    handleCreate(event) {
        this.props.bucketlistAction.createRequest();
        event.preventDefault();
    }

    handleSearch(event) {
        let searchTerm = event.target.value;
        if (!searchTerm) {
            this.props.bucketlistAction.getBucketlists();
        } else {
            this.props.bucketlistAction.search(searchTerm);
        }
    }

    render() {
        if (utils.isAuthenticated() === true) {
            return (<Redirect to="/login" />);
        }

        if (this.props.bucketlist.get("fetching")) {
            return (
                <div className="ui main container">
                    <div className="column">
                        <div className="ui active inverted dimmer">
                            <div className="ui medium text loader">Loading</div>
                        </div>
                    </div>
                </div>
            );
        }

        let bucketlists;
        if (this.props.bucketlist.get("bucketlists")) {
            bucketlists = this.props.bucketlist.get("bucketlists").map(bucketlist => {
                return <BucketsInList key={bucketlist.get("id")} bucketlist={bucketlist} />
            });
        }

        return (
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
                                    <a className="ui tiny violet button">
                                        <i className="caret left icon"></i>
                                        Previous
                                    </a>
                                    <a className="ui tiny violet button">
                                        Next
                                        <i className="caret right icon"></i>
                                    </a>
                                </div>
                            </div>

                            <div className="ui divider"></div>

                            <div className="row">
                                <div className="twelve wide column">
                                    <a className="ui tiny violet circular button"
                                       onClick={this.handleCreate.bind(this)}>
                                        <i className="plus icon"></i>
                                        Add
                                    </a>
                                </div>
                                <div className="four wide column right aligned">
                                    <div className="ui fluid search left icon input">
                                        <i className="search icon"></i>
                                        <input placeholder="Search by name" onKeyUp={this.handleSearch.bind(this)}/>
                                    </div>
                                </div>
                            </div>
                            { this.props.bucketlist.get("bucketlists").size === 0 ? <NoBucketlists />  : null }

                            { bucketlists }
                        </div>
                    </div>
                </div>
                <NewBucketlist />
            </div>
        );
    }
}

function mapStateToProps(state, prop) {
    return {
        auth: state.auth,
        bucketlist: state.bucketlist
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authAction: bindActionCreators(authActions, dispatch),
        bucketlistAction: bindActionCreators(bucketlistActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bucketlists)
