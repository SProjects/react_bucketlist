import React, {Component} from 'react';
import { Button, Form, Modal } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as itemActions from '../../actions/itemActions';

class NewItem extends Component {
    handleSubmit(event) {
        if (this.refs.name.value.length < 1) {
            alert("Item name is required.");
        } else {
            let bucketlist = this.props.bucketlist;
            let payload = {
                name: this.refs.name.value
            };
            this.props.itemAction.create(bucketlist, payload);
        }
        event.preventDefault();
    }

    handleClose() {
        this.props.itemAction.closeCreate();
    }

    render() {
        return (
            <div>
                <Modal size="small" open={this.props.modal.get("showCreate")}>
                    <Modal.Header>
                        Create New Item
                    </Modal.Header>
                    <Modal.Content>
                        <div className="row">
                            <Form className="ui eight wide column form"
                                  onSubmit={this.handleSubmit.bind(this)}>
                                <Form.Field>
                                    <input type="text" ref="name" placeholder="Name"/>
                                </Form.Field>
                                <Button negative onClick={this.handleClose.bind(this)}>
                                    Close
                                </Button>
                                <Button className="ui violet button" type="submit">
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
        modal: state.item,
        bucketlist: state.item.get("bucketlist")
    }
}

function mapDispatchToProps(dispatch) {
    return {
        itemAction: bindActionCreators(itemActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewItem)
