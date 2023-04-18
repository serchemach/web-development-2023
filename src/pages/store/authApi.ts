import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001/auth"}),
    endpoints: (builder) => ({
        signup: builder.mutation<any, {
            username: string;
            nickname: string;
            email: string;
            password: string;
        }>({
            query: (userData) => ({url: "/signup", method: "POST", body: userData})
        }),
        signin: builder.mutation<any, {
            email: string;
            password: string;
        }>({
            query: (userData) => ({url: "/signin", method: "POST", body: userData})
        })
    })
})

// export const {useGetPokemonByNameQuery} = pokemonApi
export const {useSignupMutation, useSigninMutation} = authApi;

