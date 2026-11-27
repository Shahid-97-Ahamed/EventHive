import bcrypt from "bcryptjs";
import { LogInput, SingupInput } from "./auth.validation";
import jwt from "jsonwebtoken"
import { authRepository, Role } from './auth.repository';
import { AppError } from "../../utils/AppError";
import config from "../../config/env";

//signup

const signup = async (paylode: SingupInput) => {
    const hashedPassword = await bcrypt.hash(paylode.password, 10);

    const user = await authRepository.create({
        name: paylode.name,
        email: paylode.email,
        password: hashedPassword,
        role: paylode.role
    });
    return user;
}

//LogIn

const login = async (paylode: LogInput) => {
    const user = await authRepository.findByEmail(paylode.email);

    //email is ok? chack here
    if (!user) {
        throw new AppError(401, "Invalid email or password");

    }

    //db thaka password and user er password chack korbe
    const isMatch = await bcrypt.compare(
        paylode.password,
        user.password
    );

    if (!isMatch) {
        throw new AppError(401, "Invalid email or password")
    }

    //==>after all ok then now singUp

    const token = jwt.sign(
        { id: user.id, role: user.role },
        config.jwtSecret,
        { expiresIn : config.jwtExpiresIn as any }
    )
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
    };
};

export const authService = {
    signup,
    login,
}