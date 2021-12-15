const express = require("express");
const router = express.Router();
const {
    getPosts,
    getPost,
    createPosts,
    updatePost,
    deletePost,
    likePost,
    signin,
    signup,
    getPostBySearch,
    commentPost
} = require('../controller/Post_Controller')
const auth = require('../middleware/auth');

//  for searching by post
router.get('/search', getPostBySearch)

// getting all posts
router.get("/", getPosts)

// getting single post
router.get("/:id", getPost)

// creating new post
router.post("/", auth , createPosts)

// Updating post
router.patch("/:id", auth ,  updatePost)


// Deletring post
router.delete("/:id", auth ,  deletePost)


// Updating post
router.patch("/:id/likePost", auth ,  likePost)


// Commenting post
router.post("/:id/commonPost", commentPost)

// Now Routes for Auth

router.post("/signin", signin);
router.post("/signup", signup);


module.exports = router;