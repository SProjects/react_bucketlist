import React, {Component} from 'react';
import { Button, Form, Modal } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as bucketlistActions from '../../actions/bucketlistActions';

class NewBucketlist extends Component {
    handleSubmit(event) {
        if (this.refs.name.value.length < 1) {
            alert("Bucketlist name is required.");
        } else {
            let payload = {
                name: this.refs.name.value
            };
            this.props.bucketlistAction.create(payload)
        }
        event.preventDefault();
    }

    handleClose() {
        this.props.bucketlistAction.closeCreate();
    }

    render() {
        return (
            <div>
                <Modal size="small" open={this.props.modal.get("showCreate")}>
                    <Modal.Header>
                        Create New Bucketlist
                    </Modal.Header>
                    <Modal.Content>
                        <div className="row">
                            <Form className="ui eight wide column form" onSubmit={this.handleSubmit.bind(this)}>
                                <Form.Field>
                                    <input type="text" ref="name" placeholder="Name"/>
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
        modal: state.bucketlist
    }
}

function mapDispatchToProps(dispatch) {
    return {
        bucketlistAction: bindActionCreators(bucketlistActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBucketlist)
