import { useForm } from "react-hook-form";
import {userSignupSchema, type UserSignupData} from '@/utils/auth/authUtils';
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { routerMap } from "@/global/routerMap";
import { useNavigate } from "react-router";
import { useCreateUserMutation } from "@/services/user-service";
import { LoaderCircle } from "lucide-react";
import { AuthAlert } from "./authAlert";
import { useAuthAlert } from "@/hooks/authAlertHook";

export function Signup() { 
    const [tab, setTab] = useState<"CUSTOMER" | "OPERATOR">("CUSTOMER");
    const nav = useNavigate();
    const [createUser, {isLoading}] = useCreateUserMutation();
    const { handleSubmit, register, formState } = useForm<UserSignupData>({
        resolver: zodResolver(userSignupSchema)
    });
    const { alertDescription, alertTitle, isAlertOpen, triggerAlert, setIsAlertOpen } = useAuthAlert();
    
    const signUpUser = async (data:UserSignupData) => { 
        try { 
            const response = await createUser({  
                userName: data.userName,
                passwordHash: data.pwd,
                userType: tab,
            }).unwrap();
            
            if(('userID' in response)) {
                localStorage.setItem("userID", response.userID);
                nav(routerMap.HOME);
            } else { 
                throw new Error("User creation failed, no userID returned");
            }

        } catch(e) { 
            const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
            triggerAlert("Sign Up Failed", `An error occurred while creating your account: ${errorMessage}`);
        }
    }

    return(
        <form
            onSubmit={handleSubmit((data) => signUpUser(data))}
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
            <Field>
                <FieldLabel>Confirm Password</FieldLabel>
                <Input
                    {...register("confirmPwd")}
                    type="password"
                    placeholder="●●●●●●●"
                    className="border-primary-8"
                />
                <FieldError>{formState.errors.confirmPwd?.message}</FieldError>
            </Field>
            <Button type="submit" className="w-full" disabled={isLoading}>{isLoading && <LoaderCircle className="w-4 h-4 animate-spin"/>}SIGN UP</Button>
            <p className="text-sm text-muted-foreground text-center">
                ALREADY A USER? <a className="text-secondary font-bold cursor-pointer" onClick={() => nav("/" + routerMap.LOGIN)}>LOGIN</a>
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