import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user.store'
import { authReducer } from './auth.store'
import { assignmentReducer } from './assignment.store'
import { practiceReducer } from './practice-session.store'
import { scoreboardReducer } from './scoreboard.store'

// middleware

import { firebaseUserMiddleware } from '../firestore/user-middleware'
import { firebaseAssignmentMiddleware } from '../firestore/assignment-middleware'
import { firebasePracticeSessionMiddelware } from '../firestore/practice_session-middleware'

const store = configureStore({
    reducer: {
        users: userReducer,
        auth: authReducer,
        assignments: assignmentReducer,
        practice_session: practiceReducer,
        scoreboard: scoreboardReducer
    },
    middleware: [
        firebaseUserMiddleware, 
        firebaseAssignmentMiddleware,
        firebasePracticeSessionMiddelware
    ]
})

export default store 

export type RootState = ReturnType<typeof store.getState>