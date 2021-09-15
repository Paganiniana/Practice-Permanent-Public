import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { userReducer } from './user.store'
import { authReducer } from './auth.store'
import { assignmentReducer } from './assignment.store'
import { practiceReducer } from './practice-session.store'
import { scoreboardReducer } from './scoreboard.store'
import { redux_mock_teacher } from '../test-mocks/redux-mock-data'

// actions
import { overwriteCurrentUser, updateCurrentUser, addUserData, overwriteStudentData, updateStudentData, overwriteTeacherData } from './user.store'

// Confirm that create/add/delete functions work as expected

describe('Redux: User Slice', () => {

    let store: EnhancedStore
    beforeEach(() => {
        store = configureStore({
            reducer: {
                users: userReducer,
                auth: authReducer,
                assignments: assignmentReducer,
                practice_session: practiceReducer,
                scoreboard: scoreboardReducer
            }
        })
    })

    test('It should be able to overwrite the existing user', () => {
        let current_state = store.getState()
        expect(current_state.users.user_current).not.toHaveProperty('id')
        // set the current user
        store.dispatch(overwriteCurrentUser(redux_mock_teacher.users.user_current))
        // do the checking
        let new_state = store.getState()
        expect(new_state.users.user_current).toHaveProperty('id')
    })
})