module.exports = {
    '/factory': {
        get: {
            tags: ["Manage factories"],
            description: "Fetch all existing factories",
            operationId: "allFactories",
            parameters: [],
            responses: {
                200: {
                    description: "List of all available factories",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GetAllFactoriesResponse",
                            },
                        },
                    },
                },
            },
        },

        post: {
            tags: ["Manage factories"],
            description: "Add new question",
            operationId: "AddQuestion",
            parameters: [],
            responses: {
                200: {
                    description: "new question is added",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/AddFactoryResponse",
                            },
                        },
                    },
                },
            },
        },
        delete: {
            tags: ["Manage factories"],
            summary: "Delete a requested factory",
            description: " ",
            operationId: "DeleteFactory",
            produces: ["application/json"],
            parameters: [
                {
                    name: "factoryNumber",
                    description: "delete a enter factory",
                    required: true,
                    type: "integer",
                    format: "int64",
                }
            ],
            responses: {
                "200": {
                    description: "deleted factory",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/DeleteFactoryResponse",
                            }

                        }
                    }
                },
                "404": {
                    description: "Factory number did not find",
                },
            },
        }


    }

}
