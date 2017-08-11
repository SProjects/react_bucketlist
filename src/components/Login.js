import React from 'react';
import { Button, Form } from 'semantic-ui-react';

import { Link } from 'react-router-dom';

const Login = (props) => (
    <div className="Login top-padding">
        <div className="ui stackable grid pad-top-2 full-height">
            <div className="sixteen wide center aligned row">
                <div className="sixteen wide middle aligned column">
                    <div className="ui centered padded grid">
                        <div className="ui four wide column">
                            <Form className="ui four wide column form segment">
                                <Form.Field>
                                    <div className="field centered">
                                        <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="Bucketlist"
                                             className="ui middle aligned tiny image logo-name"/>
                                        <span className="logo-name">Bucketlist</span>
                                    </div>
                                </Form.Field>
                                <Form.Field>
                                    <input type="email" placeholder="Email"
                                           onChange={props.onEmailChange}
                                           value={props.username}/>
                                </Form.Field>
                                <Form.Field>
                                    <input type="password" placeholder="Password"
                                           onChange={props.onPasswordChange}
                                           value={props.password}/>
                                </Form.Field>
                                <Button className="ui green fluid button" type="submit"
                                        onClick={props.onSignIn}>
                                    Sign in
                                </Button>

                                <div className="pad-top-2 centered link">
                                    <i className="add big yellow circle icon"/>
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

export default Login;
