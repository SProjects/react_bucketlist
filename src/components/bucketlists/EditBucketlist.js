import React, {Component} from 'react';
import { Button, Form, Modal } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as bucketlistActions from '../../actions/bucketlistActions';

class EditBucketlist extends Component {
    handleSubmit(event) {
        if (this.refs.name.value.length < 1) {
            alert("Bucketlist name is required.");
        } else {
            let id = this.props.bucketlist.get("id");
            let payload = {
                name: this.refs.name.value
            };
            this.props.bucketlistAction.update(id, payload)
        }
        event.preventDefault();
    }

    handleClose() {
        this.props.bucketlistAction.closeEdit();
    }

    render() {
        return (
            <div>
                <Modal size="small" open={this.props.modal.get("showEdit")}>
                    <Modal.Header>
                        Edit Bucketlist
                    </Modal.Header>
                    <Modal.Content>
                        <div className="row">
                            <Form className="ui eight wide column form"
                                  onSubmit={this.handleSubmit.bind(this)}>
                                <Form.Field>
                                    <input type="text" ref="name" placeholder="Name"
                                           defaultValue={this.props.bucketlist ?
                                               this.props.bucketlist.get("name") : ''}/>
                                </Form.Field>
                                <Button negative onClick={this.handleClose.bind(this)}>
                                    Close
                                </Button>
                                <Button className="ui green button" type="submit">
                                    Update
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
        modal: state.bucketlist,
        bucketlist: state.bucketlist.get("editBucketlist")
    }
}

function mapDispatchToProps(dispatch) {
    return {
        bucketlistAction: bindActionCreators(bucketlistActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBucketlist)
