import React, {Component} from 'react';
import { Button, Form, Modal } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as userActions from '../../actions/userActions';
import * as headerActions from '../../actions/headerActions';

class EditUser extends Component {
    handleSubmit(e) {
        const user_id = this.props.user.id;

        if (this.refs.first_name.value.length < 1 && this.refs.last_name.value.length < 1 &&
            this.refs.email.value.length < 1) {
            alert("Name and email fields are required.");
        } else {
            let payload = {
                id: user_id,
                first_name: this.refs.first_name.value,
                last_name: this.refs.last_name.value,
                email: this.refs.email.value,
                old_password: this.refs.old_password.value,
                password: this.refs.password.value,
                password_confirm: this.refs.password_confirm.value,
            };
            this.props.headerAction.updateCurrentUser(user_id, payload);
        }
        e.preventDefault();
    }

    handleClose() {
        this.props.headerAction.closeEditCurrentUser()
    }

    render() {
        return (
            <div>
                <Modal size="small" open={this.props.modal.get("show")}>
                    <Modal.Header>
                        Edit User Details
                    </Modal.Header>
                    <Modal.Content>
                        <div className="row">
                            <Form className="ui eight wide column form" onSubmit={this.handleSubmit.bind(this)}>
                                <div className="two fields">
                                    <Form.Field>
                                        <input type="text" ref="first_name" placeholder="First Name"
                                               className="centered" defaultValue={this.props.user.first_name}/>
                                    </Form.Field>
                                    <Form.Field>
                                        <input type="text" ref="last_name" placeholder="Last Name"
                                               defaultValue={this.props.user.last_name} className="centered" />
                                    </Form.Field>
                                </div>
                                <Form.Field>
                                    <input type="email" ref="email" className="centered" placeholder="Email"
                                           defaultValue={this.props.user.email}/>
                                </Form.Field>
                                <Form.Field>
                                    <input type="password" ref="old_password" placeholder="Old Password"
                                           className="centered" />
                                </Form.Field>
                                <Form.Field>
                                    <input type="password" ref="password" placeholder="New Password"
                                           className="centered"/>
                                </Form.Field>
                                <Form.Field>
                                    <input type="password" ref="password_confirm" placeholder="Confirm New Password"
                                           className="centered" />
                                </Form.Field>
                                <Button negative onClick={this.handleClose.bind(this)}>
                                    Close
                                </Button>
                                <Button className="ui green button" type="submit">
                                    Save
                                </Button>
                            </Form>
                        </div>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state, prop) {
    return {
        user: state.header.get("user"),
        modal: state.header
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userAction: bindActionCreators(userActions, dispatch),
        headerAction: bindActionCreators(headerActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)
