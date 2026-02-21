import { useForm } from "react-hook-form";
import {userLoginSchema, type UserLoginData} from '@/utils/auth/authUtils';
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { routerMap } from "@/global/routerMap";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthAlert } from "@/hooks/authAlertHook";
import { AuthAlert } from "./authAlert";
import { useGetUserIdByCredentialsMutation } from "@/services/user-service";
export function Login() { 
    const nav = useNavigate();
    const [tab, setTab] = useState<"CUSTOMER" | "OPERATOR">("CUSTOMER");
    const [getUserIdByCredentials, { isLoading}] = useGetUserIdByCredentialsMutation();
    const { alertDescription, alertTitle, isAlertOpen, triggerAlert, setIsAlertOpen } = useAuthAlert();
    const { handleSubmit, register, formState } = useForm<UserLoginData>({
        resolver: zodResolver(userLoginSchema)
    });

    
    const loginUser = async (data:UserLoginData) => { 
        try { 
            const response = await getUserIdByCredentials({
                userName: data.userName,
                passwordHash: data.pwd,
            }).unwrap();
            const userID = 'userID' in response ? response.userID : null;
            if(userID) { 
                localStorage.setItem("userID", userID);
                nav(routerMap.HOME);
            } else { 
                throw new Error("Invalid credentials");
            }
        } catch(e) { 
            triggerAlert("Login Failed", `An error occurred while logging in: ${e}`);
        }
    }
    

    return(
        <form
            onSubmit={handleSubmit((data) => loginUser(data))}
            className="flex flex-col gap-5"
        >
            <Tabs defaultValue="CUSTOMER" className="w-full" onValueChange={(value) => setTab(value as "CUSTOMER" | "OPERATOR")}>
                <TabsList className="w-full">
                    <TabsTrigger value="CUSTOMER" className="data-[state=active]:text-black data-[state=active]:bg-secondary text-xs font-bold">CUSTOMER</TabsTrigger>
                    <TabsTrigger value="OPERATOR" className="data-[state=active]:text-black data-[state=active]:bg-secondary text-xs font-bold">OPERATOR</TabsTrigger>
                </TabsList>
            </Tabs>
            <Field >
                <FieldLabel>Username</FieldLabel>
                <Input
                    {...register("userName")}
                    className="border-primary-8"
                />
                <FieldError>{formState.errors.userName?.message}</FieldError>
            </Field>
            <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                    {...register("pwd")}
                    type="password"
                    placeholder="●●●●●●●" 
                    className="border-primary-8"
                />
                <FieldError>{formState.errors.pwd?.message}</FieldError>
            </Field>
            <Button type="submit" className="w-full">SIGN IN</Button>
            <p className="text-sm text-muted-foreground text-center">
                DON'T HAVE AN ACCOUNT? <a className="text-secondary font-bold cursor-pointer" onClick={() => nav("/" + routerMap.SIGNUP)}>SIGN UP</a>
            </p>
            <AuthAlert 
                isOpen={isAlertOpen}
                onOpenChange={(open) => setIsAlertOpen(open)}
                title={alertTitle}
                description={alertDescription}
            />
        </form>
    );
}