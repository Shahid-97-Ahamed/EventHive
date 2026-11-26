import { ErrorRequestHandler } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    //my make error from AppError
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            ...(err.errors && { errors: err.errors })
        });
        return;
    }
    //client vul JSON dele

    if (err instanceof SyntaxError && "body" in err) {
        res.status(400).json({ success: false, message: "Invalid JSON body" });
        return;
    };

    //baki unexpected error
    console.error(err);
    res.status(500).json({
        success:false,
        message:"Internal server error"
    });
}

