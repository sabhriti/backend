const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    telephone: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
});


const User = module.exports = mongoose.model('User', userModel);

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
};
