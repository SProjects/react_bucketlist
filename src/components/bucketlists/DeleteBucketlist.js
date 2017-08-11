import React from 'react';
import { Button, Modal } from 'semantic-ui-react'

const DeleteBucketlist = (props) => (
    <div>
        <Modal size="small" open={props.modal.get("showDelete")}>
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
                <Button negative onClick={props.handleDeleteConfirm}>
                    Confirm
                </Button>
                <Button className="ui violet button"
                        onClick={props.handleDeleteClose}>
                    Nope
                </Button>
            </Modal.Actions>
        </Modal>
    </div>
);

export default DeleteBucketlist;