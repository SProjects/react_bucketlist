import React, {Component} from 'react';
import Moment from 'react-moment';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as itemActions from '../../actions/itemActions';
import EditItem from './EditItem';

class ItemsInList extends Component {
    handleEdit(item) {
        this.props.itemAction.editRequest(item);
    }

    handleCompletion(item, status) {
        let bucketlist = this.props.bucketlist;
        this.props.itemAction.updateStatus(bucketlist, item, status);
    }

    render() {
        return (
            <div className="column">

                <div className="ui fluid card">
                    <div className="content">
                        <i className="right floated trash black icon" />
                        {this.props.item.get("done") === false ?
                            <i className="right floated edit black icon"
                               onClick={this.handleEdit.bind(this, this.props.item)}/>
                            :
                            null
                        }

                        {this.props.item.get("done") ?
                            <i className="right floated check grey icon"
                               onClick={this.handleCompletion.bind(this, this.props.item, false)}/>
                            :
                            <i className="right floated check green icon"
                               onClick={this.handleCompletion.bind(this, this.props.item, true)}/>
                        }

                        <div className="header">{this.props.item.get("name")}</div>
                        <div className="description">
                            Created <Moment fromNow>{this.props.item.get("date_created")}</Moment>
                        </div>
                    </div>
                </div>

                <EditItem/>
            </div>
        );
    }
}

function mapStateToProps(state, prop) {
    return {
        bucketlist: state.item.get("bucketlist")
    }
}

function mapDispatchToProps(dispatch) {
    return {
        itemAction: bindActionCreators(itemActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsInList)
