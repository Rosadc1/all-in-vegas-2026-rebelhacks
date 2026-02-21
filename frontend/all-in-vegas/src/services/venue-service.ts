import type { deleteVenueResponse, deleteVenueRequest, getVenueByIdRequest, getVenueByIdResponse, patchVenueRequest, patchVenueResponse, createVenueRequest, createVenueResponse } from '@/types/venue-service-types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiBaseURL } from '@/global/apibaseURL';

export const venueAPI = createApi({
    reducerPath: 'venueApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: apiBaseURL
    }),
    endpoints: (builder) => ({
        getVenueById: builder.query<getVenueByIdResponse, getVenueByIdRequest>({
            query: (arg) => ({
                url: `venues/${arg.venueID}`,
                method: 'GET',
            }),
        }),
        patchVenue: builder.mutation<patchVenueResponse, patchVenueRequest>({
            query: (arg) => ({
                url: `venues/${arg.venueID}`,
                method: 'PATCH',
                body: arg
            }),
        }),
        deleteVenue: builder.mutation<deleteVenueResponse, deleteVenueRequest>({
            query: (arg) => ({
                url: `venues/${arg.venueID}`,
                method: 'DELETE',
            }),
        }),
        createVenue: builder.mutation<createVenueResponse, createVenueRequest>({
            query: (arg) => ({
                url: `venues`,
                method: 'POST',
                body: arg
            }),
        }),
    }),
});

export const { 
    useGetVenueByIdQuery,
    useLazyGetVenueByIdQuery,
    usePatchVenueMutation,
    useDeleteVenueMutation,
    useCreateVenueMutation,
} = venueAPI;
