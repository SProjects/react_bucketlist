import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types';

const EditBucketlist = (props) => (
    <div>
        <Modal size="small" open={props.modal.get("showEdit")}>
            <Modal.Header>
                Edit Bucketlist
            </Modal.Header>
            <Modal.Content>
                <div className="row">
                    <Form className="ui eight wide column form">
                        <Form.Field>
                            <input type="text" placeholder="Name"
                                   onChange={props.onChangeName}
                                   value={props.bucketlistName}
                            />
                        </Form.Field>
                        <Button negative onClick={props.handleEditClose}>
                            Close
                        </Button>
                        <Button className="ui violet button" onClick={props.handleEditSubmit}>
                            Update
                        </Button>
                    </Form>
                </div>
            </Modal.Content>
        </Modal>
    </div>
);

EditBucketlist.propTypes = {
    modal: PropTypes.object.isRequired,
    bucketlistName: PropTypes.string.isRequired,
    onChangeName: PropTypes.func.isRequired,
    handleEditSubmit: PropTypes.func.isRequired,
    handleEditClose: PropTypes.func.isRequired
};

export default EditBucketlist;