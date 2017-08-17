import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const ItemsInList = (props) => (
	<div className="ui fluid card">
		<div className="content">
			<i className="right floated trash black icon"
				onClick={props.handleDelete}/>

			{props.item.get("done") === false ?
				<i className="right floated edit black icon"
					onClick={props.handleEdit}/>
				:
				null
			}

			{props.item.get("done") ?
				<i className="right floated check grey icon"
					onClick={props.handleInComplete}/>
				:
				<i className="right floated check green icon"
					onClick={props.handleComplete}/>
			}

			<div className="header">{props.item.get("name")}</div>
			<div className="description">
                Created <Moment fromNow>{props.item.get("date_created")}</Moment>
			</div>
		</div>
	</div>
);

ItemsInList.propTypes = {
	item: PropTypes.object.isRequired,
	handleDelete: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired,
	handleInComplete: PropTypes.func.isRequired,
	handleComplete: PropTypes.func.isRequired
};

export default ItemsInList;
