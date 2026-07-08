import { NextFunction, Request, Response } from "express";
import { BaseApiException } from "../../exceptions/base-exception"

export const BaseApiExceptionHandler = (err: BaseApiException, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BaseApiException) {
        res.status(err.statusCode).json({
            details: err.details
        })
        return;
    }

    console.error(err);
    res.status(500).json({
        details: "Internal server error"
    })
}
