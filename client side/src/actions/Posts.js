import * as api from '../service_api/api';
import {
    CREATE,
    UPDATE,
    DELETE,
    FETCH_ALL,
    FETCH_BY_SEARCH,
    START_LOADING,
    END_LOADING,
    FETCH_SINGLE
} from '../constants/ActionConst';

// ALL Action Creators

// for getting all posts
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPosts(page);

        dispatch({type : FETCH_ALL, payload : data});
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error)
    }
}


// for getting single  posts
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPost(id);

        dispatch({type : FETCH_SINGLE, payload : data});
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error)
    }
}

// gettingpsost by search
export const getPostBySearch = (searchQuery) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const { data: {data} } = await api.fetchPostBySearch(searchQuery);

        dispatch({type : FETCH_BY_SEARCH, payload : data});
        dispatch({type: END_LOADING})

    } catch (error) {
        console.log(`error in getting search by post action creator an error is : `, error)
    }
}

// for creating new post
export const createPost = (post) => async (dispatch) => {
    try { 
        dispatch({type: START_LOADING})
        const {data} = await api.createPost(post);

        dispatch({type: CREATE, payload: data})
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error)
    }
}

// for updating post
export const updatePost = (id, post) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.updatePost(id,post);

        dispatch({type: UPDATE, payload: data})
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error.message)
    }
}

// For Deleting
export const  deletePost = (id) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING})
        await api.deletePost(id);

        dispatch({type: DELETE, payload: id})
        dispatch({type: END_LOADING})
    } catch (e) {
        console.log(e)
    }
}

// For Liking
export const likePost = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.likePost(id);

        dispatch({type: UPDATE, payload: data});
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error)
    }

}

// for commenting purposes
export const commentPost = (commentValue, id) => async (req, res) => {
    try {
        const { data } =  await api.comment(commentValue, id)
        
    } catch (error) {
        console.log(`error in commntpost in action creator and error is : `, error)
    }
}