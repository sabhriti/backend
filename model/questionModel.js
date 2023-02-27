const AnswerType = require("../model/answerTypeModel");

const mongoose = require('mongoose');

const localizedContentSchema = mongoose.Schema({
    lang: {
        type: String,
        required: true,
        default: 'en'
    },
    content: {
        type: String,
        required: false
    }
});

const questionSchema = mongoose.Schema({
    number: {
        type: Number,
        requireD: true
    },
    questionType: {
        type: String,
        required: true
    },
    titles: [
        {
            type: localizedContentSchema,
            required: true
        }
    ],
    additionalInformation: [
        {
            type: localizedContentSchema,
            required: false
        }
    ],
    answers: [
        {
            type: AnswerType.schema,
            required: true
        }
    ]
});

const Question = module.exports = mongoose.model('Question', questionSchema);

module.exports.get = function (callback, limit) {
    Question.find(callback).limit(limit);
};
