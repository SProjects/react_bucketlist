import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../actions/authActions';
import * as utils from '../utilities/tokenUtilities';
import Login from '../components/Login';
import Home from './Home';

class Authorization extends Component {
    onSignIn() {
        let credentials = {
            email: this.props.credentials.get("email"),
            password: this.props.credentials.get("password")
        };

        if (credentials.email.length < 1 || credentials.password.length < 0) {
            this.props.authAction.missingFields("Email and password fields are required.");
        } else {
            this.props.authAction.loginUser(credentials);
        }
    }

    onEmailChange(event) {
        let email = event.target.value;
        const password = this.props.credentials.get("password");
        this.props.authAction.onCrendentialsChange(email, password);
    }

    onPasswordChange(event) {
        let password = event.target.value;
        const email = this.props.credentials.get("email");
        this.props.authAction.onCrendentialsChange(email, password);
    }

    render() {
        return (
            <div>
                { (utils.isAuthenticated()) ?
                    <Login
                        username={this.props.credentials.get("email")}
                        password={this.props.credentials.get("password")}
                        onSignIn={this.onSignIn.bind(this)}
                        onEmailChange={this.onEmailChange.bind(this)}
                        onPasswordChange={this.onPasswordChange.bind(this)}
                    />
                    :
                    <Home/>
                }
            </div>
        )
    }
}

function mapStateToProps(state, prop) {
    return {
        auth: state.auth,
        credentials: state.auth.get("credentials")
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authAction: bindActionCreators(authActions, dispatch)
    }
}

withRouter(Authorization);
export default connect(mapStateToProps, mapDispatchToProps)(Authorization);