export interface Venue { 
    venueID: string,
    eventID: string,
    title: string,
    description: string,
    time: string,
    location: mapLocation
}

export interface mapLocation { 
    x:number,
    y:number,
}

// CREATE VENUE
export interface createVenueRequest {
    eventID: string,
    title: string,
    description: string,
    time: string,
    location: mapLocation
}

export interface createVenueResponse {
    status: number,
    message: string
}

// GET VENUE BY ID
export interface getVenueByIdRequest {
    venueID: string
}

export interface getVenueByIdResponse extends Venue {}

// PATCH VENUE
export interface patchVenueRequest {
    venueID: string,
    title?: string,
    description?: string,
    time?: string,
    location?: mapLocation
}

export interface patchVenueResponse {
    status: number,
    message: string
}

// DELETE VENUE
export interface deleteVenueRequest {
    venueID: string
}

export interface deleteVenueResponse {
    message: string
}