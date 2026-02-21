import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Outlet } from "react-router";
import { routerMap } from "@/global/routerMap";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export default function AuthHost() { 
    const useNav = useNavigate();
    return(
        <div className="flex flex-col items-center justify-center-safe h-screen w-screen gap-10">
            <Button variant="ghost" className="flex items-center gap-2 absolute top-4 left-4 text-muted-foreground" onClick={() => useNav(routerMap.HOME)}>
                <ArrowLeftIcon />
                BACK TO HOME
            </Button>
            <h1 className="font-extrabold text-primary flex flex-col items-center">
                Convention Platform
                <span className="text-foreground flex gap-1">
                    ALL IN <p className="text-secondary">VEGAS</p>
                </span>
            </h1>
            <Card className="min-h-max h-1/2 w-1/4 min-w-120 border-t-4 border-t-primary">
                <CardHeader>
                    <p className="font-extrabold">CREATE YOUR ACCOUNT</p>
                    <p className="text-xs font-semibold text-muted-foreground">JOIN THE ALL IN VEGAS COMMUNITY</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-10">
                    <Outlet/>
                </CardContent>
            </Card>
        </div>
    );
}