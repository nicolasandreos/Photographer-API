import swaggerJsdoc from "swagger-jsdoc";

const port = process.env.APP_PORT ?? "3000";

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "photos-ai",
            version: "1.0.0",
        },
        servers: [{ url: `http://localhost:${port}` }],
        paths: {
            "/photographer/all": {
                get: {
                    summary: "Get all photographers",
                    responses: {
                        "200": { description: "Photographers found" },
                        "500": { description: "Internal server error" },
                    },
                },
            },
            "/photographer/{id}": {
                get: {
                    summary: "Get photographer by id",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                        },
                    ],
                    responses: {
                        "200": { description: "Photographer found" },
                        "404": { description: "Photographer not found" },
                        "500": { description: "Internal server error" },
                    },
                },

                put: {
                    summary: "Update a photographer",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        name: { type: "string" },
                                        email: { type: "string" },
                                        phoneNumber: { type: "string" },
                                        studioName: { type: "string", nullable: true },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        "200": { description: "Photographer updated" },
                        "400": { description: "Bad request" },
                        "404": { description: "Photographer not found" },
                        "500": { description: "Internal server error" },
                    },
                },
                delete: {
                    summary: "Delete a photographer",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                        },
                    ],
                    responses: {
                        "204": { description: "Photographer deleted" },
                        "404": { description: "Photographer not found" },
                        "500": { description: "Internal server error" },
                    },
                },
            },
            "/photographer/create": {
                post: {
                    summary: "Create a new photographer",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        name: { type: "string" },
                                        email: { type: "string" },
                                        password: { type: "string" },
                                        phoneNumber: { type: "string" },
                                        studioName: { type: "string", nullable: true },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        "201": { description: "Photographer created" },
                        "400": { description: "Bad request" },
                        "409": { description: "Photographer already exists" },
                        "500": { description: "Internal server error" },
                    },
                },
            },
            "/photographer/{id}/change-password": {
                put: {
                    summary: "Change a photographer password",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        password: { type: "string" },
                                        newPassword: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        "204": { description: "Photographer password changed" },
                        "400": { description: "Bad request" },
                        "401": { description: "Invalid password" },
                        "409": { description: "New password cannot be the same as the old password" },
                        "500": { description: "Internal server error" },
                    },
                },
            },
            "/photographer/login": {
                post: {
                    summary: "Login a photographer",
                    requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                            email: { type: "string" },
                            password: { type: "string" },
                            },
                        },
                        },
                    },
                    },
                    responses: {
                    "200": { description: "Photographer logged in" },
                    "401": { description: "Invalid credentials" },
                    "400": { description: "Validation error" },
                    "500": { description: "Internal server error" },
                    },
                },
            },
            "/administrator-user/create": {
                post: {
                    summary: "Create a new administrator user",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        email: { type: "string" },
                                        password: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        "201": { description: "Administrator user created" },
                        "400": { description: "Bad request" },
                        "409": { description: "Administrator user already exists" },
                        "500": { description: "Internal server error" },
                    },
                },
            },
        },
    },
    apis: [],
});
