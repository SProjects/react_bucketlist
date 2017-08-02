import React from 'react';

import App from './App';
import Login from './components/Login';
import Register from './components/users/Register';
import UserEdit from './components/users/UserEdit';
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
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/edit-user" component={UserEdit}/>
            </div>
        </Router>
    );
};

export default Routes;
