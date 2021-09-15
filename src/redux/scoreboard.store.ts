import { createSlice } from '@reduxjs/toolkit'

const initial_scoreboard = {
    top_by_hours: [],
    top_by_streak: []
}

export const scoreboardSlice = createSlice({
    name: 'scoreboard',
    initialState: initial_scoreboard,
    reducers: {
        setTopListHours: (state, action) => {
            state.top_by_hours = action.payload
        },
        setTopListStreak: (state, action) => {
            state.top_by_streak = action.payload
        }
    }
})


export const { setTopListHours, setTopListStreak } = scoreboardSlice.actions

export const scoreboardReducer = scoreboardSlice.reducer