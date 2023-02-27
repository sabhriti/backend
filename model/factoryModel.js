const mongoose = require('mongoose');

const factoryModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    code: {
        type: String,
        required: true
    }
});


const Factory = module.exports = mongoose.model('Factory', factoryModel);

module.exports.get = function (callback, limit) {
    Factory.find(callback).limit(limit);
};
