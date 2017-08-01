import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import {Provider} from 'react-redux';

import store from './store';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

const storeInstance = store();

ReactDOM.render(
    <Provider store={storeInstance}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
