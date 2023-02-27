module.exports = {
    '/answer': {
        get: {
            tags: ["Manage answers"],
            description: "Fetch all existing answers",
            operationId: "allAnswers",
            parameters: [],
            responses: {
                200: {
                    description: "List of all Answers",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GetAllAnswerResponse",
                            },
                        },
                    },
                },
            },
        },
    }
}