export interface Venue { 
    venueID: string,
    eventID: string,
    title: string,
    description: string,
    time: string,
    location:mapLocation
}

export interface mapLocation { 
    x1:number,
    x2:number,
    y1:number,
    y2:number
}