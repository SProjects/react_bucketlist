import React, {Component} from "react";

class NoBucketlists extends Component {
	render() {
		return (
			<div className="row">
				<div className="sixteen wide column">
					<div className="ui basic message">
                        No bucketlists to display.
					</div>
				</div>
			</div>
		);
	}
}

export default NoBucketlists;
