import { Button } from "@/components/ui/button";
import {LogIn, UserPlus} from 'lucide-react';
import { useNavigate } from "react-router";
import { routerMap } from "@/global/routerMap";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

export default function Header() { 
    const useNav = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => { 
        const userID = localStorage.getItem("userID");
        if(userID) { 
            setIsLoggedIn(true);
        }
    }, []);
    
    return(
        <div className="flex justify-between border-b-2 p-2 shrink-0">
            <a className="cursor-pointer" onClick={() => useNav(routerMap.HOME)}><h1 className="font-extrabold">ALL IN <p className="text-secondary">VEGAS</p></h1></a>
            <div className="flex gap-2 items-center">
                {isLoggedIn ? (
                        <Button variant="ghost" onClick={() =>{ localStorage.removeItem("userID"); useNav(routerMap.LOGIN)}}><LogOut className="w-4 h-4"/>Logout</Button>      
                ) : (
                    <>
                        <Button variant="ghost" onClick={() => useNav(routerMap.LOGIN)}><LogIn className="w-4 h-4"/>Login</Button>
                        <Button className="shadow-lg shadow-primary/50" onClick={() => useNav(routerMap.SIGNUP)}><UserPlus className="w-4 h-4"/>Sign Up</Button>
                    </>
                )}
                </div>
        </div>
    );
}