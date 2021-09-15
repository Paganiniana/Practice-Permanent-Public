import { createSlice } from '@reduxjs/toolkit'

export type PracticeItemType = {
    assignment_id: string,
    minutes: number,
    current: boolean,
    completed: boolean,
}

export type PracticeSessionType = {
    id: string,
    date_created: number, // milliseconds since linux epoch
    user_id: string,
    items: Array<PracticeItemType>,
    finished: boolean,
}

export const practiceSlice = createSlice({
    name: 'practice_session',
    initialState: [{}],
    reducers: {
        addPracticeSession: (state, action) => {
            state.push(action.payload)
        },
        removePracticeSession: (state, action) => {
            // todo
            let index = state.findIndex((p: any) => p.id === action.payload.id)
            if (index !== -1) {
                state = state.splice(index, 1)
            }
        },
        updatePracticeSession: (state, action) => {
            let index = state.findIndex((s: any) => {
                return action.payload.id === s.id
            })
            if (index !== -1) {
                state[index] = action.payload
            }
        },
        overwritePracticeSession: (state, action ) => {
            // used when new events are pushed from remote storage
            let index = state.findIndex((s: any) => {
                return action.payload.id === s.id
            })
            if (index !== -1) {
                state[index] = action.payload
            } else {
                state.push(action.payload)
            }
        }
    }
})

export const { addPracticeSession, updatePracticeSession, removePracticeSession, overwritePracticeSession } = practiceSlice.actions

export const practiceReducer = practiceSlice.reducer