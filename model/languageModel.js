const mongoose = require('mongoose');

const languageModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});


const Language = module.exports = mongoose.model('Language', languageModel);

module.exports.get = function (callback, limit) {
    Language.find(callback).limit(limit);
};
