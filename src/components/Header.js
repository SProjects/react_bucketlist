import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as headerActions from '../actions/headerActions';
import * as utils from '../utilities/tokenUtilities';

class Header extends Component {
    componentWillMount() {
        this.props.headerAction.getCurrentUser();
    }

    handleLogout(e) {
        utils.removeAuthToken();
        window.location.reload();
        e.preventDefault();
    }

    render() {
        return (
            <div className="ui fixed inverted menu">
                <div className="ui container">
                    <a className="header item">
                        <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="Bucketlist" className="logo"/>
                        Bucketlist
                    </a>

                    <div className="right menu">
                        <div className="ui simple dropdown item">
                            {this.props.first_name}
                            <i className="dropdown icon"></i>
                            <div className="menu">
                                <Link to="/edit-user" className="item">Account settings</Link>
                                <a className="item" onClick={this.handleLogout.bind(this)}>Logout</a>
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
        first_name: state.header.get("user").first_name
    }
}

function mapDispatchToProps(dispatch) {
    return {
        headerAction: bindActionCreators(headerActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
