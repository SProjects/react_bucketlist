import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import * as headerActions from '../actions/headerActions';
import * as utils from '../utilities/tokenUtilities';
import EditUser from './users/EditUser';

class Header extends Component {
    componentWillMount() {
        this.props.headerAction.getCurrentUser();
    }

    handleLogout(e) {
        utils.removeAuthToken();
        window.location.reload();
        e.preventDefault();
    }

    handleUserEdit(e) {
        this.props.headerAction.editCurrentUserRequest();
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <div className="ui fixed inverted menu">
                    <div className="ui container">
                        <Link to="/" className="header item">
                            <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="Bucketlist" className="logo"/>
                            Bucketlist
                        </Link>

                        <div className="right menu">
                            <div className="ui simple dropdown item">
                                {this.props.first_name}
                                <i className="dropdown icon"></i>
                                <div className="menu">
                                    <a className="item" onClick={this.handleUserEdit.bind(this)}>
                                        Account settings
                                    </a>
                                    <a className="item" onClick={this.handleLogout.bind(this)}>
                                        Logout
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <EditUser/>
            </div>
        );
    }
}

function mapStateToProps(state, prop) {
    return {
        first_name: state.header.get("user").first_name
    }
}

function mapDispatchToProps(dispatch) {
    return {
        headerAction: bindActionCreators(headerActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
