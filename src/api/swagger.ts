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
            },
        },
    },
    apis: [],
});
