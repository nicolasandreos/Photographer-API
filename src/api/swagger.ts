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
            "/status": {
                get: {
                    responses: { "200": { description: "" } },
                },
            },
            "/photographer/all": {
                get: {
                    responses: {
                        "200": { description: "" },
                        "500": { description: "" },
                    },
                },
            },
        },
    },
    apis: [],
});
