import { Outlet } from "react-router";
import { Footer } from "@/features/common/footer/footer";
import Header from "../header/Header";
import { AIChatHost } from "@/features/chat";

export default function AppHost() { 

    return(
        <div className="flex flex-col h-screen overflow-hidden">
            <Header/>
            <div className="flex-1 overflow-y-auto">
                <Outlet />
            </div>
            <Footer/>
        </div>
        
    );
}