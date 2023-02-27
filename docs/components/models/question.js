const localizedContent = require('./localizedContent');
const category= require('./category');

module.exports = {
    type: "object",
    properties: {
        _id: {
            type: "string",
            description: "Question identification number",
            example: "61e34633384df7782b1dafc0",
        },
        number: {
            type: "number",
            description: "Question Number",
            example: "1",
        },
        titles: {
            type: "array",
            items: localizedContent,
            description: "The title of questions in multiple languages",
            example: [
                {
                    "lang": "en",
                    "content": "I am doing well at work"
                },
                {
                    "lang": "vi",
                    "content": "something else"
                }
            ]

        },
        answerType: {
            type: "scale",
            description: "multiple choice of answer",
            example: "happy, sad, moderate",
        },
        slug: {
            type: "string",
            description: "machine readable questions",
            example: "are-you-happy",
        },
        category: {
            type: "array",
            description: "multiple choice of answer",
            items: category
        },
        additionalInformation: {
            type: "array",
            description: "additional information of operations",
            items: localizedContent,
            example: [
                {
                    "lang": "en",
                    "content": "No explanation needed"
                }
            ]

        },
        answers: {
            type: "array",
            items: localizedContent,
            description: "type of answer",
            example: [
                {
                    "lang": "en",
                    "content": "1"
                }
            ]
        }
    }
};
