import React from 'react';

import App from './App';
import Login from './components/Login';
import Register from './components/users/Register';
import history from './history';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

const Routes = () => {
    return (
        <Router history={history}>
            <div>
                <Route exact path="/" component={App}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
            </div>
        </Router>
    );
};

export default Routes;
