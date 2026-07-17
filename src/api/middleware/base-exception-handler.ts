import { NextFunction, Request, Response } from "express";
import { BaseApiException } from "../../exceptions/base-exception"
import { ZodError } from "zod";

export const BaseApiExceptionHandler = (err: BaseApiException | ZodError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BaseApiException) {
        res.status(err.statusCode).json({
            success: false,
            message: err.details,
            statusCode: err.statusCode,
        })
        return;
    }

    if (err instanceof ZodError) {
        res.status(400).json({
            success: false,
            message: "Validation error",
            statusCode: 400,
            errors: Object.fromEntries(
                err.issues.map(issue => [
                    issue.path.join("."),
                    issue.message,
                ]),
            ),
        })
        return;
    }

    console.error(err);
    res.status(500).json({
        details: "Internal server error"
    })
}
