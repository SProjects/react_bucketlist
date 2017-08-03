import {combineReducers} from 'redux';

import auth from './authReducers';
import user from './userReducers';
import bucketlist from './bucketlistReducers';
import header from './headerReducers';
import item from './itemReducers';

export default combineReducers({
    auth,
    user,
    bucketlist,
    header,
    item
});