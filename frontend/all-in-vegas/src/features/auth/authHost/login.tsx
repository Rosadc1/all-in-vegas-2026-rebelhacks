import { useForm } from "react-hook-form";
import {userLoginSchema, type UserLoginData} from '@/utils/auth/authUtils';
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { routerMap } from "@/global/routerMap";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Login() { 
    const nav = useNavigate();
    const [tab, setTab] = useState<"ATTENDEE" | "ORGANIZER">("ATTENDEE");

    const { handleSubmit, register, formState } = useForm<UserLoginData>({
        resolver: zodResolver(userLoginSchema)
    });

    return(
        <form
            onSubmit={handleSubmit((data) => console.log(data, tab))}
            className="flex flex-col gap-5"
        >
            <Tabs defaultValue="ATTENDEE" className="w-full" onValueChange={(value) => setTab(value as "ATTENDEE" | "ORGANIZER")}>
                <TabsList className="w-full">
                    <TabsTrigger value="ATTENDEE" className="data-[state=active]:text-black data-[state=active]:bg-secondary text-xs font-bold">ATTENDEE</TabsTrigger>
                    <TabsTrigger value="ORGANIZER" className="data-[state=active]:text-black data-[state=active]:bg-secondary text-xs font-bold">ORGANIZER</TabsTrigger>
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
        </form>
    );
}