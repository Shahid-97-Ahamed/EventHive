import { RequestHandler } from "express";
import { ZodType } from "zod";
import { AppError } from "../utils/AppError";

export const validate =(schema:ZodType):RequestHandler=>(req,_res,next)=>{
    const result =schema.safeParse(req.body ?? {});

    if(!result.success){
        const errors =result.error.issues.map((issue)=>({
            field:issue.path.join("."),
            message:issue.message
        }));
        return next(new AppError(400,"Validation Error",errors))
    }

    req.body = result.data; //clean + with default value data
    next();
}