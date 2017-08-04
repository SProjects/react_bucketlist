import React, {Component} from 'react';
import { Button, Form, Modal } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as itemActions from '../../actions/itemActions';

class EditItem extends Component {
    handleSubmit(event) {
        if (this.refs.name.value.length < 1) {
            this.props.itemAction.missionFields("Item name is required.");
        } else {
            let bucketlist = this.props.bucketlist;
            let id = this.props.selectedItem.get("id");
            let payload = {
                name: this.refs.name.value
            };
            this.props.itemAction.update(bucketlist, id, payload);
        }
        event.preventDefault();
    }

    handleClose() {
        this.props.itemAction.closeEdit();
    }

    render() {
        return (
            <div>
                <Modal size="small" open={this.props.modal.get("showEdit")}>
                    <Modal.Header>
                        Edit Item
                    </Modal.Header>
                    <Modal.Content>
                        <div className="row">
                            <Form className="ui eight wide column form"
                                  onSubmit={this.handleSubmit.bind(this)}>
                                <Form.Field>
                                    <input type="text" ref="name" placeholder="Name"
                                           defaultValue={this.props.selectedItem ?
                                               this.props.selectedItem.get("name") : ''}/>
                                </Form.Field>
                                <Button negative onClick={this.handleClose.bind(this)}>
                                    Close
                                </Button>
                                <Button className="ui violet button" type="submit">
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
        modal: state.item,
        bucketlist: state.item.get("bucketlist"),
        selectedItem: state.item.get("selectedItem")
    }
}

function mapDispatchToProps(dispatch) {
    return {
        itemAction: bindActionCreators(itemActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItem)
