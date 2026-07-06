import express, { Router } from "express";

export const createApp = (
    photographerRouter: Router
) => {
    const app = express();
    app.use(express.json());

    app.get("/status", (req, res) => {
        res.status(200).json({ status: "OK"});
    })

    app.use("/photographer", photographerRouter);

    return app;

}