import React, {Component} from 'react';
import { Button, Form, Modal } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as bucketlistActions from '../../actions/bucketlistActions';

class DeleteBucketlist extends Component {
    handleClose() {
        this.props.bucketlistAction.closeDelete();
    }

    handleDelete(bucketlist) {
        this.props.bucketlistAction.destroy(bucketlist.get("id"));
    }

    render() {
        return (
            <div>
                <Modal size="small" open={this.props.modal.get("showDelete")}>
                    <Modal.Header>
                        Delete Bucketlist
                    </Modal.Header>
                    <Modal.Content>
                        <div className="row">
                            <p>
                                Are you sure you want to delete this bucketlist? This action is not reversible.
                            </p>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.handleDelete.bind(this, this.props.bucketlist)}>
                            Confirm
                        </Button>
                        <Button className="ui violet button"
                                onClick={this.handleClose.bind(this)}>
                            Nope
                        </Button>
                    </Modal.Actions>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteBucketlist)
