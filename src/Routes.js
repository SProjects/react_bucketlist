import React from 'react';

import App from './App';
import Register from './components/users/Register';
import ItemsContainer from './containers/ItemsContainer';
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
                <Route path="/register" component={Register}/>
                <Route path="/bucketlists/:id/items" component={ItemsContainer}/>
            </Switch>
        </Router>
    );
};

export default Routes;
