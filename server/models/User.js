const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    bio: {
        type: String,
        default: ''
    },

    avatar: {
        type: String,
        default: ''
    }
}, {timestamps : true});

module.exports = mongoose.model('User', UserSchema);

