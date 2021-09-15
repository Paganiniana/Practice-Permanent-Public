import { createSlice } from '@reduxjs/toolkit'

export type AssignmentType = {
    id: string,
    assigned_by_id: string,
    assigned_to_id: string,
    category: string,
    current: boolean,
    description: string,
    name: string,
}

export const assignmentSlice = createSlice({
    name: 'assignments',
    // array of assignment objects
    initialState: [{}],
    reducers: {
        overwriteAssignment: (state, action) => {
            // used to update assignments from the server
            let i = state.findIndex((a: any) => {
                return a.id === action.payload.id
            })
            if (i !== -1) {
                state[i] = action.payload    
            } else {
                state.push(action.payload)
            }
        },
        addAssignment: (state, action) => {
            let assignment = action.payload
            state.push(assignment)
        },
        removeAssignment: (state, action) => {
            // expects a payload of a single action object
            let id = action.payload.id
            // get index
            let i = state.findIndex((a: any) => {
                return id === a.id
            })
            if (i !== -1) {
                state = state.splice(i, 1)
            }
        },
        updateAssignment: (state, action) => {
            // expects a payload of a single action object
            let id = action.payload.id
            // get index
            let i = state.findIndex((a: any) => {
                return id === a.id
            })

            state[i] = action.payload
        },
        overwriteAssignmnets: (state, action) => {
            // expects a payload of a list of assignments
            state = [... action.payload]
        }
    }
})


export const { addAssignment, removeAssignment, updateAssignment, overwriteAssignment, overwriteAssignmnets } = assignmentSlice.actions

export const assignmentReducer = assignmentSlice.reducer