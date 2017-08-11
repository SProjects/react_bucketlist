import React, {Component} from 'react';
import { Button, Form } from 'semantic-ui-react'
import { Redirect, Link, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import * as userActions from '../../actions/userActions';
import Toaster from '../Toaster';

class Register extends Component {
    handleSubmit(event) {
        if(this.refs.first_name.value.length < 1 && this.refs.last_name.value.length < 1 &&
            this.refs.email.value.length < 1 && this.refs.password.value.length < 1 &&
            this.refs.password_confirm.value.length < 1) {
            this.props.userAction.missingFields("All fields are required.");
        } else {
            let payload = {
                first_name: this.refs.first_name.value,
                last_name: this.refs.last_name.value,
                email: this.refs.email.value,
                password: this.refs.password.value,
                password_confirm: this.refs.password_confirm.value,
            };
            this.props.userAction.registerUser(payload).then(() => {
                if(this.props.user.get("registered")){
                    this.props.history.push("/");
                }
            });
        }
        event.preventDefault();
    }

    render() {
        if (this.props.auth.get("isLoggedIn") === true) {
            return (<Redirect to="/" from="/register"/>);
        }

        return (
            <div className="Register top-padding">
                <Toaster/>
                <div className="ui stackable grid padded full-height">
                    <div className="sixteen wide center aligned row">
                        <div className="sixteen wide middle aligned column">
                            <div className="ui centered padded grid">
                                <div className="eight wide column">
                                    <Form className="ui eight wide column form segment"
                                          onSubmit={this.handleSubmit.bind(this)}>
                                        <div className="field centered">
                                            <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="Bucketlist"
                                                 className="ui middle aligned tiny image logo-name"/>
                                                <span className="logo-name">Bucketlist</span>
                                        </div>
                                        <div className="two fields">
                                            <Form.Field>
                                                <input type="text" className="centered" ref="first_name"
                                                       placeholder="First Name"/>
                                            </Form.Field>
                                            <Form.Field>
                                                <input type="text" className="centered" ref="last_name"
                                                       placeholder="Last Name"/>
                                            </Form.Field>
                                        </div>
                                        <Form.Field>
                                            <input type="email" className="centered" ref="email" placeholder="Email"/>
                                        </Form.Field>
                                        <Form.Field>
                                            <input type="password" className="centered" ref="password"
                                                   placeholder="Password"/>
                                        </Form.Field>
                                        <Form.Field>
                                            <input type="password" className="centered" ref="password_confirm"
                                                   placeholder="Confirm Password"/>
                                        </Form.Field>
                                        <Button className="ui green fluid button" type="submit">Create Account</Button>

                                        <div className="pad-top-2 centered link">
                                            <i className="arrow left big yellow circle icon"/>
                                            <Link to="/">Back</Link>
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
        auth: state.auth,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authAction: bindActionCreators(authActions, dispatch),
        userAction: bindActionCreators(userActions, dispatch),
    }
}

withRouter(Register);
export default connect(mapStateToProps, mapDispatchToProps)(Register)
