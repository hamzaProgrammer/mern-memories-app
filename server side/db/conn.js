const mongoose = require('mongoose');
const DB = process.env.DB;

mongoose.connect(DB,{
    useCreateIndex : true,
    useNewUrlParser: true,
    useUnifiedTopology : true,
    useFindAndModify : false
}).then(() => {
    console.log("Connection made with MongoDB Atlas")
}).catch(() => {
    console.log("Connection to MongoD failed")
})