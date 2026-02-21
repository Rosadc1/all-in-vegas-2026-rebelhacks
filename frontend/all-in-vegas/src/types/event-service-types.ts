export interface Event {
    eventID: string,
    userId: string,
    title: string,
    description: string,
    date: string[],
    location: string,
    tag: string[]
}

// CREATE EVENT
export interface createEventRequest {
    eventID: string,
    userId: string,
    title: string,
    description: string,
    date: string[],
    location: string
}

export interface createEventResponse {
    status: number,
    message: string
}

// GET EVENT BY ID
export interface getEventByIdRequest {
    eventID: string
}

export interface getEventByIdResponse extends Event {}

// LIST EVENTS
export interface listEventsRequest {
    userID?: string
}

export interface listEventsResponse {
    events: Event[]
}

// PATCH EVENT
export interface patchEventRequest {
    eventID: string,
    title?: string,
    description?: string,
    date?: string[],
    location?: string,
    tag?: string[]
}

export interface patchEventResponse {
    status: number,
    message: string
}

// DELETE EVENT
export interface deleteEventRequest {
    eventID: string
}

export interface deleteEventResponse {
    message: string
}
