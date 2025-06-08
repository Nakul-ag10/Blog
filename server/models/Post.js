const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title : {
        type: String,
        trim: true,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author : {
        type: mongoose.Schema.Types.ObjectId, //Links post to User._id
        ref: 'User',
        required: true
    }
}, {timestamps: true});

module.exports =  mongoose.model('Post', postSchema);

