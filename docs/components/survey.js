const survey = require('./models/survey.js');

const getAllSurveyResponse = {
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
            example: "survey retrieved"
        },
        data: {
            type: "array",
            items: survey,
        }
    }
};

module.exports = {getAllSurveyResponse};