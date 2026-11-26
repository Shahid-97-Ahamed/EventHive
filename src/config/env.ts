import dotenv from "dotenv";
import path from "path";

dotenv.config({path:path.join(process.cwd(),".env")});

const config ={
    port:process.env.PORT || 5000,
    databaseUrl:process.env.DATABASE_URL as string,
    jwtSecret:process.env.JWT_SECRET as string,
    jwtExpiresIn:process.env.JWT_EXPIRES_IN || "7d",
};

export default config;