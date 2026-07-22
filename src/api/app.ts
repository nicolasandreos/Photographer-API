import express, { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import { BaseApiExceptionHandler } from "./middleware/base-exception-handler";

export const createApp = (
    photographerRouter: Router,
    administratorUserRouter: Router
) => {
    const app = express();
    app.use(express.json());
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    
    app.use("/photographer", photographerRouter);
    app.use("/administrator-user", administratorUserRouter);

    app.use(BaseApiExceptionHandler);
    return app;

}