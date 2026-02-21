import { z } from "zod";

export const userLoginSchema = z.object({
  userName: z.string().min(1, "Username is required"),
  pwd: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const userSignupSchema = z.object({
    userName: z.string().min(1, "Username is required"),
    pwd: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
    confirmPwd: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.pwd === data.confirmPwd, {
    message: "Passwords do not match",
    path: ["confirmPwd"],
});


export type UserLoginData = z.infer<typeof userLoginSchema>;
export type UserSignupData = z.infer<typeof userSignupSchema>;
