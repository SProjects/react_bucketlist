import React, {Component} from 'react';
import { Button, Form, Modal } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as itemActions from '../../actions/itemActions';

class DeleteItem extends Component {
    handleDelete(item) {
        let bucketlist = this.props.bucketlist;
        this.props.itemAction.destroy(bucketlist, item);
    }

    handleClose() {
        this.props.itemAction.closeDelete();
    }

    render() {
        return (
            <div>
                <Modal size="small" open={this.props.modal.get("showDelete")}>
                    <Modal.Header>
                        Item Deletion
                    </Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete this item? This action is irreversible.</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.handleDelete.bind(this, this.props.selectedItem)}>
                            Confirm
                        </Button>
                        <Button className="ui green button"
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteItem)
