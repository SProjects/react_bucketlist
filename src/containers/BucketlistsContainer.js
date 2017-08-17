import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as bucketlistActions from "../actions/bucketlistActions";

import Bucketlist from "../components/bucketlists/Bucketlists";
import BucketsInListContainer from "./BucketsInListContainer";
import Loading from "../components/Loading";
import NewBucketlist from "../components/bucketlists/NewBucketlist";

class BucketlistsContainer extends Component {
	componentWillMount() {
		this.props.bucketlistAction.getBucketlists();
	}

	componentDidMount() {
		this.props.bucketlistAction.getBucketlists();
	}

	handleCreate(event) {
		this.props.bucketlistAction.createRequest();
		event.preventDefault();
	}

	handleSearch(event) {
		let searchTerm = event.target.value;
		if (!searchTerm) {
			this.props.bucketlistAction.getBucketlists();
		} else {
			this.props.bucketlistAction.search(searchTerm);
		}
	}

	handlePreviousNav() {
		let urlPath = this.props.bucketlist.get("previous");
		this.props.bucketlistAction.navigate(urlPath);
	}

	handleNextNav() {
		let urlPath = this.props.bucketlist.get("next");
		this.props.bucketlistAction.navigate(urlPath);
	}

	//Create Bucketlist
	handleCreateClose() {
		this.props.bucketlistAction.closeCreate();
	}

	onChangeName(event) {
		let name = event.target.value;
		this.props.bucketlistAction.newBucketlistName(name);
	}

	handleCreateSubmit() {
		let name = this.props.bucketlist.get("bucketlistName");
		if (name < 1) {
			this.props.bucketlistAction.missingFields("Bucketlist name is required");
		} else {
			let payload = {
				name: name
			};
			this.props.bucketlistAction.create(payload);
		}
	}

	render() {

		if (this.props.bucketlist.get("fetching")) {
			return (
				<Loading/>
			);
		}

		let bucketsInList;
		if (this.props.bucketlist.get("bucketlists")) {
			bucketsInList = this.props.bucketlist.get("bucketlists").map(bucketlist => {
				return <BucketsInListContainer
					key={bucketlist.get("id")}
					bucketlist={bucketlist}
				/>;
			});
		}

		return (
			<div>
				<Bucketlist
					handleCreate={this.handleCreate.bind(this)}
					handleSearch={this.handleSearch.bind(this)}
					handlePreviousNav={this.handlePreviousNav.bind(this)}
					previousPresent={this.props.bucketlist.get("previous")}
					handleNextNav={this.handleNextNav.bind(this)}
					nextPresent={this.props.bucketlist.get("next")}
					bucketlists={this.props.bucketlist.get("bucketlists")}
					bucketsInList={bucketsInList}
				/>
				<NewBucketlist
					handleCreateClose={this.handleCreateClose.bind(this)}
					handleCreateSubmit={this.handleCreateSubmit.bind(this)}
					onChangeName={this.onChangeName.bind(this)}
					bucketlistName={this.props.bucketlist.get("bucketlistName")}
					modal={this.props.bucketlist}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		bucketlist: state.bucketlist
	};
}

function mapDispatchToProps(dispatch) {
	return {
		bucketlistAction: bindActionCreators(bucketlistActions, dispatch)
	};
}

withRouter(BucketlistsContainer);
export default connect(mapStateToProps, mapDispatchToProps)(BucketlistsContainer);