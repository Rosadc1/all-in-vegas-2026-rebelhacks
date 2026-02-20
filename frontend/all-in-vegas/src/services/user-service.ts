import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userAPI = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: ''
    }),
    endpoints: (builder) => ({

    })
})