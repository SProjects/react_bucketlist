import React, { Component } from "react";

import BucketlistsContainer from '../containers/BucketlistsContainer';
import HeaderContainer from '../containers/HeaderContainer';

class Home extends Component {
    render() {
        return (
            <div>
                <HeaderContainer/>
                <BucketlistsContainer/>
            </div>
        )
    }
}

export default Home;