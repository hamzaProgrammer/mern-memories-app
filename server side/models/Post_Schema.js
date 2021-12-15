const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title : {
        type : String
    },
    message: {
        type: String
    },
    name : {
        type: String
    },
    creator: {
        type: String
    },
    tags : [String],
    selectedFile: String,
    likes : {
        type : [String],
        default : [],
    },
    comments: {
        type: String,
        default: []
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

module.exports = PostMessage;