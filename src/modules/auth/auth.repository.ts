import { pool } from "../../config/db";

export type Role ="attendee" | "organizer";

export interface UserRow {
    id:number,
    name:string,
    email:string,
    password:string,
    role:Role;
    created_at:Date;
    updated_at:Date,
}

export type PublicUser =Omit<UserRow,"password">;

const findByEmail =async(email:string):Promise<UserRow | undefined>=>{
    const result =await pool.query(`
        SELECT * FROM users EHERE email =$1`,[email]);
        return result.rows[0];
}

const create =async(data:{
    name:string,
    email:string,
    password:string,
    role:Role;
}):Promise<PublicUser>=>{
    const result =await pool.query(`INSERT INTO users (name,email,password,role)
        VALUES ($1,$2,$3,$4) 
        RETURNING id,name,email,role,created_at,updated_at`,
        [data.name,data.email,data.password,data.role]);

    const user =result.rows[0];
    if(!user) throw new Error("User insert failed");
    return user
    
}

export const authRepository ={findByEmail,create}