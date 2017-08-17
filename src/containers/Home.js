import React  from "react";

import BucketlistsContainer from "../containers/BucketlistsContainer";
import HeaderContainer from "../containers/HeaderContainer";

class Home extends React.Component {
	render() {
		return (
			<div>
				<HeaderContainer/>
				<BucketlistsContainer/>
			</div>
		);
	}
}

export default Home;