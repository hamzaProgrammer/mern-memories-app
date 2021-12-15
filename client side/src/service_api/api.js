const axios = require('axios');

const API = axios.create({
    baseURL: 'http://localhost:5000'
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

const fetchPosts = (page) => API.get(`/?page=${page}`);
const fetchPost = (id) => API.get(`/${id}`)
const fetchPostBySearch = (searchQuery) => API.get(`/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
const createPost = (newPost) => API.post('/', newPost);
const updatePost = (id, updatedPost) => API.patch(`/${id}`, updatedPost);
const deletePost = (id) => API.delete(`/${id}`);
const likePost = (id) => API.patch(`/${id}/likePost`);
const comment = (value , id) => API.post(`/${id}/commentPost`, { value });


const signIn = (formData) => API.post('/signin', formData);
const signUp = (formData) => API.post('/signup', formData);


module.exports = {
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    signIn,
    signUp,
    fetchPostBySearch,
    fetchPost
}

