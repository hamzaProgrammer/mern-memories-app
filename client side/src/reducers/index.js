import {combineReducers} from 'redux';
import {PostReducer} from './Posts'
import {authReducer} from './authReducers'

export default combineReducers({
    posts: PostReducer,
    auth: authReducer
});