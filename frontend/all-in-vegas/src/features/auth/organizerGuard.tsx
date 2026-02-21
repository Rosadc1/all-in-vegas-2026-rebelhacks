import { Outlet } from "react-router";


export default function OrganizerGuard() {
    
    if(Math.random() > 0.5) { // TODO: implement auth logic
        return <div>Unauthorized</div>
    }
    return(
        <Outlet />
    );
}