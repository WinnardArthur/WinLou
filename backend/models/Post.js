const { triggerAsyncId } = require('async_hooks');
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true 
    }, 
    slug: {
        type: String,
        required: true 
    },
    desc: {
        type: String,
        required: true 
    }, 
    photo: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true 
    },
    category: {
        type: String,
        required: true,
        // ref: 'Category' 
    }
}, {timestamps: true})

module.exports = mongoose.model("Post", PostSchema)