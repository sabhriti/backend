const localizedContent = require('./localizedContent');

module.exports = {
    type: "object",
    properties: {
        _id: {
            type: "string",
            description: "Question identification number",
            example: "61e34633384df7782b1dafc0",
        },
        titles:
            {
                type: "array",
                items: localizedContent
            },
        slug: {
            type: "string",
            description: "machine readable category name",
            example: "overall-well-being",
        }
    }
};