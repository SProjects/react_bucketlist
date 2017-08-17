import React from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

const NewBucketlist = (props) => (
	<div>
		<Modal size="small" open={props.modal.get("showCreate")}>
			<Modal.Header>
                Create New Bucketlist
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
						<Button negative onClick={props.handleCreateClose}>
                            Close
						</Button>
						<Button className="ui violet button" onClick={props.handleCreateSubmit}>
                            Save
						</Button>
					</Form>
				</div>
			</Modal.Content>
		</Modal>
	</div>
);

NewBucketlist.propTypes = {
	modal: PropTypes.object.isRequired,
	bucketlistName: PropTypes.string,
	onChangeName: PropTypes.func.isRequired,
	handleCreateSubmit: PropTypes.func.isRequired,
	handleCreateClose: PropTypes.func.isRequired
};

export default NewBucketlist;
