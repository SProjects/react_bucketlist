import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import * as bucketlistActions from '../../actions/bucketlistActions';
import * as itemActions from '../../actions/itemActions';
import * as utils from '../../utilities/tokenUtilities';
import Header from '../../components/Header';

class Items extends Component {
    render() {
        if (utils.isAuthenticated() === true) {
            return (<Redirect to="/login" />);
        }

        if (this.props.item.get("loading")) {
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

        let itemsList = this.props.item.get("items").map(item => {
            return (
                <div className="column" key={item.get("id")}>
                    <div className="ui fluid card">
                        <div className="content">
                            <i className="right floated trash black icon confirm-item-delete"></i>
                            <i className="right floated edit black icon"></i>
                            <i className="right floated check green icon confirm-item-complete"></i>

                            <div className="header">{item.get("name")}</div>
                            <div className="description">
                                Created 2 days ago
                            </div>
                        </div>
                    </div>
                </div>
            )
        });

        return (
            <div>
                <Header/>
                <div className="Items">
                    <div className="ui main container">
                        <div className="column">
                            <div className="ui grid">

                                <div className="row">
                                    <div className="six wide column">
                                    <span className="ui header">
                                        {this.props.item.get("bucketlist").get("name")}
                                </span>
                                    </div>
                                    <div className="right aligned ten wide column">
                                        <Link to="/" className="ui tiny violet button">
                                            <i className="caret left icon"></i>
                                            Back
                                        </Link>
                                    </div>
                                </div>

                                <div className="ui divider"></div>

                                <div className="row">
                                    <div className="sixteen wide column">
                                        <a className="ui tiny violet circular button">
                                            <i className="plus icon"></i>
                                            Add
                                        </a>
                                    </div>
                                </div>

                                <div className="row">
                                    { this.props.item.get("items").size === 0 ?
                                        <div className="sixteen wide column">
                                            <div className="ui basic message">
                                                No items to display.
                                            </div>
                                        </div>
                                        :
                                        <div className="ui three column grid">
                                            {itemsList}
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, prop) {
    return {
        auth: state.auth,
        item: state.item
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authAction: bindActionCreators(authActions, dispatch),
        itemAction: bindActionCreators(itemActions, dispatch),
        bucketlistAction: bindActionCreators(bucketlistActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)
