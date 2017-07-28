import React from 'react';
import App from './App';
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
            </div>
        </Router>

    );
};

export default Routes;
