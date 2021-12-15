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

export const PostReducer = (state = { isLoading: true, posts: [] } , action) => {
    switch(action.type){
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }

        case START_LOADING:
            return { ...state, isLoading: true }

        case END_LOADING:
            return {  ...state,  isLoading: false  }

        case CREATE :
            return { ...state, posts: action.payload } ;

        case UPDATE:
            return { ...state , posts: [ state.posts.map((post) => post.id === action.payload._id ? action.payload : post) ] };

        case DELETE:
            return { ...state ,  posts: [ state.posts.filter((post) => post._id !== action.payload) ] }

        case FETCH_BY_SEARCH: {
            return { ...state, posts: action.payload  };
        }

        case FETCH_SINGLE: {
            return { ...state, post: action.payload  };
        }

        default :
            return state;
    }
}
