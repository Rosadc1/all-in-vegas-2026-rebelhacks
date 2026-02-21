import { Button } from "@/components/ui/button";
import {LogIn, UserPlus} from 'lucide-react';

export default function Header() { 

    return(
        <div className="flex justify-between border-b-2 p-2 shrink-0">
            <h1 className="font-extrabold">ALL IN <p className="text-secondary">VEGAS</p></h1>
            <div className="flex gap-2 items-center">
                <Button variant="ghost"><LogIn className="w-4 h-4"/>Login</Button>
                <Button className="shadow-lg shadow-primary/50"><UserPlus className="w-4 h-4"/>Sign Up</Button>
            </div>
        </div>
    );
}