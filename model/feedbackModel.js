const mongoose = require('mongoose');

const feedbackModel = mongoose.Schema({
    lang: {
        type: String,
        required: true,
        default: 'en'
    },
    content: {
        type: String,
        required: true
    },
    surveyId: {
        type: String,
        required: true
    },
    factoryCode: {
        type: String,
        required: true
    },
    factoryId: {
        type: String,
        required: true
    }
});


const Feedback = module.exports = mongoose.model('Feedback', feedbackModel);

module.exports.get = function (callback, limit) {
    Feedback.find(callback).limit(limit);
};