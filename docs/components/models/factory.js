module.exports =  {
    type: "object",
    properties: {
        _id: {
            type: "string",
            description: "factory identification number",
            example: "61e34633384df7782b1dafc0",
        },
        name: {
            type: "string",
            description: "name of factory",
            example: "vaude",
        },
        code: {
            type: "string",
            description: "factory related code",
            example: "1234",
        }
    }
};
