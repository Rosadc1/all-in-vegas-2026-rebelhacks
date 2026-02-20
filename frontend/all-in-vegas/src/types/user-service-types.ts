import type { Event } from "./event-service-types";

export interface user { 
    userID:string,
    userType: userType,
    pwd: string,
    events: Event[]
}

export type userType = "operator" | "customer";