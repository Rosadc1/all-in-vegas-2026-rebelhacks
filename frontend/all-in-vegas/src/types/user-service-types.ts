import type { generalResponse } from "./common-service-types";

export interface user { 
    userID:string,
    userName: string,
    userType: userType,
    passwordHash: string,
    events: string[]
}

export type userType = "ATTENDEE" | "ORGANIZER";

export type createUserRequest = Omit<user, "userID" | "events">;
export type createUserResponse = generalResponse;

export type getUserByIdRequest = { userID: string };
export type getUserByIdResponse = user;

export type patchUserRequest = Partial<user> & { userID: string };
export type patchUserResponse = generalResponse;

export type deleteUserRequest = { userID: string };
export type deleteUserResponse = generalResponse;

export type getUserIdByCredentialsRequest = { 
    userName: string,
    passwordHash: string
}
export type getUserIdByCredentialsResponse = {
    userID: string
} | generalResponse;