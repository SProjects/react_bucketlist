import {combineReducers} from 'redux';

import auth from './authReducers';
import user from './userReducers';

export default combineReducers({
    auth,
    user
});