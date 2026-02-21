export interface user {
    userID: string,
    userType: userType,
    userName: string,
    passwordHash: string,
    events: string[]
}

export type userType = "operator" | "customer";