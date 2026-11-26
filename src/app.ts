import express, { type Application, type Request, type Response } from "express"
import  cors from "cors";
import { AppError } from "./utils/AppError";
import { errorHandler } from "./middleware/error.middleware";
const app:Application =express(); 

app.use(cors())
app.use(express.json()); //req.body te jeson pawar jonno

app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({
        success:true,
        message:"EventHive API is running"
    })
})

// //test route
// app.use("/test-error",()=>{
//     throw new AppError(400,"Test Error")
// })

//if any typr if route don't match!!!
app.use((_req,_res,next)=>{
    next(new AppError(404,"Route not found"));
})

//at last
app.use(errorHandler)



export default app;