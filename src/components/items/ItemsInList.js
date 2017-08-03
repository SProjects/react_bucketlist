import React, {Component} from 'react';
import Moment from 'react-moment';

class ItemsInList extends Component {
    render() {
        return (
            <div className="column">
                <div className="ui fluid card">
                    <div className="content">
                        <i className="right floated trash black icon confirm-item-delete"></i>
                        <i className="right floated edit black icon"></i>
                        <i className="right floated check green icon confirm-item-complete"></i>

                        <div className="header">{this.props.item.get("name")}</div>
                        <div className="description">
                            Created <Moment fromNow>{this.props.item.get("date_created")}</Moment>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemsInList
