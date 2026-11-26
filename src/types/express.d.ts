export interface AuthUser {
    id:number;
    role:"attendee" | "organizer";
}

declare global {
    namespace Express {
        interface Request {
            user:AuthUser
        }
    }
}