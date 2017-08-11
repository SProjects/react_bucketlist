import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as headerActions from '../actions/headerActions';
import * as utils from '../utilities/tokenUtilities';

import Header from '../components/Header';

class HeaderContainer extends Component {
    componentWillMount() {
        this.props.headerAction.getCurrentUser();
    }

    onLogout(event) {
        utils.removeAuthToken();
        window.location.reload();
        event.preventDefault();
    }

    onUserEdit(event) {
        this.props.headerAction.editCurrentUserRequest();
        event.preventDefault();
    }

    render() {
        return (
            <Header
                firstName={this.props.firstName}
                onLogout={this.onLogout.bind(this)}
                onUserEdit={this.onUserEdit.bind(this)}
            />
        )
    }
}

function mapStateToProps(state, prop) {
    return {
        firstName: state.header.get("user").first_name,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        headerAction: bindActionCreators(headerActions, dispatch),
    }
}

withRouter(HeaderContainer);
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);