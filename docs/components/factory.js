const factory = require('./models/factory.js');


const getAllFactoriesResponse = {
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
            example: "Factory retrieved"
        },
        data: {
            type: "array",
            items: factory,
        }
    }
};
const addFactoryResponse = {
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
            example: "Factory added"
        },
        data: factory
    }
};

const deleteFactoryResponse = {
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
            example: "Factory deleted"
        }
    }
};


module.exports = {getAllFactoriesResponse, addFactoryResponse, deleteFactoryResponse};