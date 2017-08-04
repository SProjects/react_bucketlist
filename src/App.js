import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as actions from './actions/authActions';

import Bucketlists from './components/bucketlists/Bucketlists';
import Header from './components/Header';
import './App.css';

class App extends Component {
    render() {
        if (this.props.auth.get("isLoggedIn") === false) {
            return (<Redirect to="/login" from="/"/>);
        }

        return (
            <div className="App">
                <Header />
                <Bucketlists />
            </div>
        );
    }
}

function mapStateToProps(state, prop) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authAction: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
