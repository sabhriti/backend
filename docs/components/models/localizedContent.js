module.exports = {
    type: "object",
    properties: {
        _id: {
            type: "string",
            description: "Question identification number",
            example: "61e34633384df7782b1dafc0",
        },
        lang: {
            type: "string",
            description: "en character language code",
            example: "en",
        },
        content: {
            type: "string",
            description: "Content of the string on the provided language",
            example: "Overall Well-being",
        }
    }
};