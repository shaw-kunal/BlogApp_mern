const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        requied: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        requied: false
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: false
    },
    like:{
        type:Array,
        required:false
    },
    heart:{
        type:Array,
        requied:false
    }
},
    { timestamps: true }

)

module.exports = mongoose.model("Posts", PostSchema);