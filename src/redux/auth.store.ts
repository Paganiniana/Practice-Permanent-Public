import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        signed_in: false,
        auth_data: {}
    },
    reducers: {
        signIn: (state, action) => {
            state.signed_in = true
            state.auth_data = action.payload
        },
        signOut: (state) => {
            state.signed_in = false
            state.auth_data = {}
        }
    }
})

// actions

export const { signIn, signOut } = authSlice.actions

export const authReducer = authSlice.reducer