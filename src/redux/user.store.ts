import { createSlice } from '@reduxjs/toolkit'
import { UserDataType, empty_user } from '../firestore/users'

// TODO: set empty user on initial state

// temporary values 
const initial_state = {
    user_current: {},
    user_students: [{}],
    user_teachers: [{}]
}

export const userSlice = createSlice({
    name: 'users',
    initialState: initial_state,
    reducers: {
        // reducers for current user 
        updateCurrentUser: (state, action) => {
            // sanitize? type-check? update only specific fields?
            let new_user: UserDataType = action.payload
            state.user_current = new_user
        },
        overwriteCurrentUser: (state, action) => {
            // used by remote storage and 'new user' page
            state.user_current = action.payload
        },
        addUserData: (state, action) => {
            state.user_current = action.payload
        },
        // reducers for students 
        overwriteStudentData: (state, action) => {
            // used by remote storage, to update the whole list
            state.user_students = action.payload
        },
        updateStudentData: (state, action) => {
            // get an individual student's index in the list and replace it
            let i = state.user_students.indexOf((s: any) => {
                return s.id == action.payload.id
            })
            state.user_students[i] = action.payload
        },
        // reducers for teachers 
        overwriteTeacherData: (state, action) => {
            // used by firestore, to update the whole list
            state.user_teachers = action.payload
        },
    }
})

// Reducer

export const userReducer = userSlice.reducer

// Actions 

export const { overwriteCurrentUser, updateCurrentUser, addUserData, overwriteStudentData, updateStudentData, overwriteTeacherData } = userSlice.actions