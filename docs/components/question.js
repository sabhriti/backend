const question = require('./models/question');

const getAllQuestionsResponse = {
    type: "object",
    properties: {
        status: {
            type: "string",
            description: "Status of the request",
            example: "success"
        },
        message: {
            type: "string",
            description: "Message describing the response",
            example: "Questions retrieved"
        },
        data: {
            type: "array",
            items: question
        }
    }
};

const addQuestionResponse = {
    type: "object",
    properties: {
        status: {
            type: "string",
            description: "Status of the request",
            example: "success"
        },
        message: {
            type: "string",
            description: "Message describing the response",
            example: "Questions added"
        },
        data: question
    }
};

const deleteQuestionResponse = {
    type: "object",
    properties: {
        status: {
            type: "string",
            description: "Status of the request",
            example: "success"
        },
        message: {
            type: "string",
            description: "Message describing the response",
            example: "Question deleted"
        }
    }
};


module.exports = {getAllQuestionsResponse, addQuestionResponse, deleteQuestionResponse};