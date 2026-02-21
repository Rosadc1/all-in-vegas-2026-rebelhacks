import type { deleteEventResponse, deleteEventRequest, getEventByIdRequest, getEventByIdResponse, patchEventRequest, patchEventResponse, createEventRequest, createEventResponse, listEventsRequest, listEventsResponse } from '@/types/event-service-types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiBaseURL } from '@/global/apibaseURL';

export const eventAPI = createApi({
    reducerPath: 'eventApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: apiBaseURL
    }),
    endpoints: (builder) => ({
        getEventById: builder.query<getEventByIdResponse, getEventByIdRequest>({
            query: (arg) => ({
                url: `event/${arg.eventID}`,
                method: 'GET',
            }),
        }),
        listEvents: builder.query<listEventsResponse, listEventsRequest>({
            query: (arg) => ({
                url: arg.userID ? `events/${arg.userID}` : `events`,
                method: 'GET',
            }),
        }),
        patchEvent: builder.mutation<patchEventResponse, patchEventRequest>({
            query: (arg) => ({
                url: `events/${arg.eventID}`,
                method: 'PATCH',
                body: arg
            }),
        }),
        deleteEvent: builder.mutation<deleteEventResponse, deleteEventRequest>({
            query: (arg) => ({
                url: `events/${arg.eventID}`,
                method: 'DELETE',
            }),
        }),
        createEvent: builder.mutation<createEventResponse, createEventRequest>({
            query: (arg) => ({
                url: `events`,
                method: 'POST',
                body: arg
            }),
        }),
    }),
});

export const { 
    useGetEventByIdQuery,
    useLazyGetEventByIdQuery,
    useListEventsQuery,
    useLazyListEventsQuery,
    usePatchEventMutation,
    useDeleteEventMutation,
    useCreateEventMutation,
} = eventAPI;
