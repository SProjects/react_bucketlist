import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'

import { Redirect, Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/authActions';

class Login extends Component {
    handleSubmit(e) {
        let email = this.refs.email.value;
        let password = this.refs.password.value;

        if(email === "" || password === "") {
            alert("Email and password fields are required");
        } else {
            let loginCredentials = {
                email: email,
                password: password
            };
            this.props.action.loginUser(loginCredentials).then(() => {
                if (this.props.auth.get("isLoggedIn")) {
                    this.props.history.push("/");
                } else {
                    alert(this.props.auth.get("error"));
                }
            });
        }
        e.preventDefault();
    }

    render() {
        if (this.props.auth.isLoggedIn) {
            return (<Redirect to="/" from="/login"/>);
        }

        return (
            <div className="Login top-padding">
                <div className="ui stackable grid pad-top-2 full-height">
                    <div className="sixteen wide center aligned row">
                        <div className="sixteen wide middle aligned column">
                            <div className="ui centered padded grid">
                                <div className="ui four wide column">
                                    <Form className="ui four wide column form segment"
                                          onSubmit={this.handleSubmit.bind(this)}>
                                        <Form.Field>
                                            <div className="field centered">
                                                <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="Bucketlist"
                                                     className="ui middle aligned tiny image logo-name"/>
                                                <span className="logo-name">Bucketlist</span>
                                            </div>
                                        </Form.Field>
                                        <Form.Field>
                                            <input type="email" ref="email" placeholder="Email"/>
                                        </Form.Field>
                                        <Form.Field>
                                            <input type="password" ref="password" placeholder="Password"/>
                                        </Form.Field>
                                        <Button className="ui green fluid button" type="submit">Sign in</Button>

                                        <div className="pad-top-2 centered link">
                                            <i className="add big yellow circle icon"></i>
                                            <Link to="/register" className="link">Sign up for an account!</Link>
                                        </div>
                                    </Form>
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
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actions, dispatch)
    }
}

withRouter(Login);
export default connect(mapStateToProps, mapDispatchToProps)(Login);
