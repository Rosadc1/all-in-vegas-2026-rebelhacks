import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiBaseURL } from '@/global/apibaseURL';
import type { GetEventRecommendationsRequest, GetEventRecommendationsResponse } from '@/types/ai-service-types';

export const aiAPI = createApi({
    reducerPath: 'aiApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiBaseURL,
    }),
    endpoints: (builder) => ({
        getEventRecommendations: builder.mutation<GetEventRecommendationsResponse, GetEventRecommendationsRequest>({
            query: (arg) => ({
                url: 'ai/recommend',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
});

export const {
    useGetEventRecommendationsMutation,
} = aiAPI;
