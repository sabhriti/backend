module.exports = {
    '/survey': {

        get: {
            tags: ["Manage survey"],
            description: "Fetch all survey",
            operationId: "allSurvey",
            parameters: [],
            responses: {
                200: {
                    description: "survey",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GetAllSurveyResponse",
                            },
                        },
                    },
                },
            },
        },
    }
}

