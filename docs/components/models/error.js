module.exports = {
    type: "object",
    properties: {
        message: {
            type: "string",
            description: "Error message",
            example: "Not found",
        },
        internal_code: {
            type: "string",
            description: "Error internal code",
            example: "Invalid parameters",
        }
    }
};