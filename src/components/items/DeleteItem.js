import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DeleteItem = (props) => (
    <div>
        <Modal size="small" open={props.modal.get("showDelete")}>
            <Modal.Header>
                Item Deletion
            </Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete this item? This action is irreversible.</p>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={props.handleDeleteSubmit}>
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

DeleteItem.propTypes = {
    modal: PropTypes.object.isRequired,
    handleDeleteSubmit: PropTypes.func.isRequired,
    handleDeleteClose: PropTypes.func.isRequired
};

export default DeleteItem;
