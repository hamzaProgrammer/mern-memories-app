const { mongoose } = require("mongoose")
const PostMessage = require("../models/Post_Schema")

// for auth
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../models/UsersSchema')

// getting all posts
const getPosts = async (req,res) => {
    const { page } = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) -1 ) * LIMIT; // get start index of evry page
        const total = await PostMessage.countDocuments({});  // calculates total no of documents

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({data: posts , currentPage: parseInt(page)  , numberOfPages: Math.ceil(total/LIMIT) });
    } catch (error) {
        console.log(`Error in getPosts and error is given below : ` , error)
        res.status(404).json({message : error.message})
    }
}

// getting single post
const getPost =  async (req,res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post)
    } catch (error) {
        console.log(`Error in getPost and error is : ` , error)
    }
}

//  getting post by search
const getPostBySearch = async (req, res) => {
    const { searchQuery , tags } = req.query;
    try {
        const title = new RegExp(searchQuery, 'i'); // here i will convert capital to lower latters

        const posts = await PostMessage.find({$or: [{ title }, {tags: {$in: tags.split(',') }}]})

        res.json({data: posts})
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error})
    }
}

// creating new post
const createPosts = (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({...post , creator: req.userId , createdAt: new Date().toISOString()})
    try {
        newPost.save();

        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message : error})
    }
}

// Updating Single Post
const updatePost = async (req,res) => {
    const {id:_id } = req.params;
    const post = req.body;
    //if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No posts with that Id');
    const updatedPost = await PostMessage.findByIdAndUpdate(_id , {...post, _id} , {new: true});
    res.json(updatedPost);
}


// Deleting post
const deletePost = async (req,res) => {
    const {id} = req.params;
    const det = await PostMessage.findByIdAndRemove(id);
    if(det){
        console.log("Deleted")
    }else{
        console.log("Not delted")
    }
    res.json({message: "Post Deleted SuccessFully"});
}


// Liking post
const likePost = async(req,res) => {
    const {id} = req.params;

    if(!req.userid){
        return res.json({message: "!!! Unauthticated"})
    }

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id)=> id === string(userId));

    if(index === -1){
        post.likes.push(req.userId);
    }else{
        post.likes = post.likes.filter((id) => id !== string(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id,  post , {new: true} )

    res.json(updatedPost)
}



// For Auth Controllers


const signup = async (req,res) => {
    const {email , password , firstName , lastName , conformPassword} = req.body;
    try {
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(404).json({message:'User Already exists '})
        }

        if (password !== conformPassword) {
            return res.status(400).json({message: "Passwords Do not Match"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result =  await User.create({email, password: hashedPassword , name: `${firstName} ${lastName}`});

        const token = jwt.sign({email: result.email, id: result._id} , 'test' , {expiresIn: '1h'}); // here name of token

        res.status(200).json({result , token})
    } catch (error) {
        console.log(`Err is in Controlelr and error is : `, error)
        res.status(500).json({message: 'SomeThing Went wrong in Signin In Cntroller'})
    }
}


const signin = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        const existingUser = await User.findOne({
            email
        });

        if (!existingUser) {
            cosole.log("User Not found")
            return res.status(404).json({
                message: 'User Does Not exists '
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect) {
            console.log("password not matches")
            return res.status(400).json({
                message: 'Invalid Credientials'
            })
        }

        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id
        }, 'test', {
            expiresIn: '1h'
        }); // here name of token

        res.status(200).json({
            result: existingUser,
            token
        });
    } catch (error) {
        res.status(500).json({
            message: 'SomeThing Went wrong in Signin In Cntroller'
        })
    }
}

// for comments
const commentPost = async (req,res) => {
    const { id } = req.params;
    const { vakue } = req.body

    const post = await PostMessages.findById(id);

    post.comments.push(value)

    const updatePost =  await PostMessages.findByIdAndUpdate(id, post , {new: true} )

    res.json(updatePost)

}

module.exports = {
    getPosts,
    createPosts,
    updatePost,
    deletePost,
    likePost,
    signin,
    signup,
    getPostBySearch,
    getPost,
    commentPost
}