//have token and if its true then put req.user

import { RequestHandler } from "express";
import { AppError } from "../utils/AppError";
import jwt from "jsonwebtoken";
import config from "../config/env";
import { AuthUser } from "../types/express";

export const authenticate:RequestHandler=(req,_res,next)=>{
    const header =req.headers.authorization;
    
    //if header doesn't exists 
    if(!header){
        return next(new AppError(401,"Unauthorized: token is missing"))
    
    }

    //bearer token and just token both can use

   const token= header.startsWith("Bearer ")? header.slice(7) : header;

    try {
        const decoded =jwt.verify(token,config.jwtSecret) as unknown as AuthUser;
        req.user={id:decoded.id,role:decoded.role};
        next()
    } catch {
        next(new AppError(401,"Unauthorized: invalid or expired token"))
    }
};


//req.user role is allowed check here

export const authorize =
(...roles:AuthUser["role"][]):RequestHandler=>(req, _res, next)=>{
    if(!roles.includes(req.user.role)){
        return next(new AppError(403,"Forbidden: you do not have permission"));

    }
    next()
}
