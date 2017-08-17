import React from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

const EditItem = (props) => (
	<div>
		<Modal size="small" open={props.modal.get("showEdit")}>
			<Modal.Header>
                Edit Item
			</Modal.Header>
			<Modal.Content>
				<div className="row">
					<Form className="ui eight wide column form">
						<Form.Field>
							<input type="text" placeholder="Name"
								onChange={props.onChangeName}
								value={props.itemName}/>
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

EditItem.propTypes = {
	itemName: PropTypes.string.isRequired,
	modal: PropTypes.object.isRequired,
	onChangeName: PropTypes.func.isRequired,
	handleEditClose: PropTypes.func.isRequired,
	handleEditSubmit: PropTypes.func.isRequired
};

export default EditItem;
