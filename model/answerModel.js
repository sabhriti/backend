const mongoose = require('mongoose');

const answerModel = mongoose.Schema({
    questionId: {
        type: String,
        required: true
    },

    questionNumber: {
        type: String,
        required: true
    },

    answerValue: {
        type: String,
        required: false
    },

    answerText: {
        type: String,
        required: false
    },

    factoryCode: {
        type: String,
        required: true
    },

    surveyId: {
        type: String,
        required: true
    },

    answerDate: {
        type: Date,
        required: true
    }
});

const Answer = module.exports = mongoose.model('Answer', answerModel);

module.exports.get = function (callback, limit) {
    Answer.find(callback).limit(limit);
};
