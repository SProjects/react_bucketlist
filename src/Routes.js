import React from 'react';

import App from './App';
import Login from './components/Login';
import Register from './components/users/Register';
import Items from './components/items/Items';
import history from './history';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/bucketlists/:id/items" component={Items}/>
            </Switch>
        </Router>
    );
};

export default Routes;
