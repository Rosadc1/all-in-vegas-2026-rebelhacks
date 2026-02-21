import { Button } from "@/components/ui/button";
import { Home, BookOpen, Calendar, Map, Menu } from "lucide-react";
import { useNavigate } from "react-router";
import { routerMap } from "@/global/routerMap";
export function Footer() { 
    const useNav = useNavigate();

    return(
        <div className={`flex justify-between md:justify-center lg:justify-center md:gap-30 lg:gap-30 h-15 border-t-2 shrink-0`}>
            <Button variant="ghost" size="default" className="nav-btn" onClick={() => useNav(routerMap.HOME)}>
                <Home/>
                HOME
            </Button>   
            <Button variant="ghost" size="default" className="nav-btn"
                    onClick={() => useNav(routerMap.CATALOG)}>
                <BookOpen/>
                CATALOG
            </Button>
            <Button variant="ghost" size="default" className="nav-btn"
                    onClick={() => useNav(routerMap.CALENDAR)}>
                <Calendar/>
                CALENDAR
            </Button>
            <Button variant="ghost" size="default" className="nav-btn"
                    onClick={() => useNav(routerMap.MAPS)}>
                <Map/>
                MAPS
            </Button>
            <Button variant="ghost" size="default" className="nav-btn"
                    onClick={() => useNav(routerMap.MENU)}>
                <Menu className="nav-icon"/>
                MENU
            </Button>
        </div>
    );
}