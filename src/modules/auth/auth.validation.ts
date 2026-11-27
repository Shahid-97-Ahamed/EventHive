import { z} from "zod";

export const signupSchema =z.object({
    name:z.string().min(1,"name is required"),
    email:z.string("email is not valid").toLowerCase(),
    password:z.string().min(6,"password must be at least 6"),
    role:z.enum(["attendee","organizer"]).default("attendee")
});

export const loginSchema =z.object({
    email:z.string("email is no valid").toLowerCase(),
    password:z.string().min(1,"password is required")
})

export type SingupInput =z.infer<typeof signupSchema>;
export type LogInput =z.infer<typeof loginSchema>;