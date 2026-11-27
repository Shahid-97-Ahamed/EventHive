import { Request, Response } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";


///this is for signup

const signup = async (req: Request, res: Response) => {
    const user = await authService.signup(req.body);
    sendResponse(res, 201, "User registered successfully", user);

}

//this is for login

const login = async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    sendResponse(res, 200, "Login successful", result);
}

export const authController ={signup,login,}