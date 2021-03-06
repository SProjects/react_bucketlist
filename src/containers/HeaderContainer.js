import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as headerActions from "../actions/headerActions";
import * as utils from "../utilities/tokenUtilities";

import Header from "../components/Header";

class HeaderContainer extends Component {
	componentWillMount() {
		this.props.headerAction.getCurrentUser();
	}

	onLogout(event) {
		utils.removeAuthToken();
		this.context.router.history.push("/");
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
		);
	}
}

function mapStateToProps(state) {
	return {
		firstName: state.header.get("user").first_name,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		headerAction: bindActionCreators(headerActions, dispatch),
	};
}

HeaderContainer.propTypes = {
	firstName: PropTypes.string,
	headerAction: PropTypes.object
};

HeaderContainer.contextTypes = {
	router: PropTypes.object
};

withRouter(HeaderContainer);
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);