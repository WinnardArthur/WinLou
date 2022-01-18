const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['others', 'music', 'sports', 'programming', 'medicine', 'heath', 'education', 'writing'],
        default: 'others'
    }
}, {timestamps: true})  


module.exports = mongoose.model("Category", CategorySchema)