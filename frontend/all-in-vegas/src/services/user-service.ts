import type { deleteUserResponse, deleteUserRequest,  getUserByIdRequest,  getUserByIdResponse,  patchUserRequest,  patchUserResponse, createUserRequest, createUserResponse, getUserIdByCredentialsResponse, getUserIdByCredentialsRequest } from '@/types/user-service-types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiBaseURL } from '@/global/apibaseURL';

export const userAPI = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: apiBaseURL
    }),
    endpoints: (builder) => ({
        getUserById: builder.query<getUserByIdResponse, getUserByIdRequest>({
            query: (arg) => ({
                url: `users/${arg.userID}`,
                method: 'GET',
            }),
        }),
        patchUser: builder.mutation<patchUserResponse,patchUserRequest>({
            query: (arg) => ({
                url: `users/${arg.userID}`,
                method: 'PATCH',
                body: arg
            }),
        }),
        deleteUser: builder.mutation<deleteUserResponse, deleteUserRequest>({
            query: (arg) => ({
                url: `users/${arg.userID}`,
                method: 'DELETE',
            }),
        }),
        createUser: builder.mutation<createUserResponse, createUserRequest>({
            query: (arg) => ({
                url: `users`,
                method: 'POST',
                body: arg
            }),
        }),
        getUserIdByCredentials: builder.mutation<getUserIdByCredentialsResponse, getUserIdByCredentialsRequest>({
            query: (arg) => ({
                url: `users/login/${arg.userName}`,
                method: 'POST',
                body: { passwordHash: arg.passwordHash }
            }),
        }),
    }),
});

export const { 
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
    usePatchUserMutation,
    useDeleteUserMutation,
    useCreateUserMutation,
    useGetUserIdByCredentialsMutation
} = userAPI;