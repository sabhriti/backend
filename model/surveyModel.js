const mongoose = require('mongoose');

const surveySchema = mongoose.Schema({
    surveyName: {
        type: String,
        required: true
    },
    factoryId: {
        type: String,
        required: true
    },
    questions: [
        {
            type: String,
            required: true
        }
    ]
});

const Survey = module.exports = mongoose.model('Survey', surveySchema);

module.exports.get = function (callback, limit) {
    Survey.find(callback).limit(limit);
};
