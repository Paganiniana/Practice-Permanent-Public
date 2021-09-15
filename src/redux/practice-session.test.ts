import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { userReducer } from './user.store'
import { authReducer } from './auth.store'
import { assignmentReducer, overwriteAssignmnets } from './assignment.store'
import { practiceReducer } from './practice-session.store'
import { scoreboardReducer } from './scoreboard.store'
import { redux_mock_teacher, redux_mock_teacher_data } from '../test-mocks/redux-mock-data'

// actions
import { addPracticeSession, updatePracticeSession, removePracticeSession, overwritePracticeSession } from './practice-session.store'


describe('Redux: Practice Session Slice', () => {

    let tmp_practice_session = {
        id: 'p1',
        date_created: new Date().getTime(), // milliseconds since linux epoch
        user_id: 'u1',
        items: [
            {
                assignment_id: 'a1',
                minutes: 3,
                current: false,
                completed: true,
            },
            {
                assignment_id: 'a2',
                minutes: 3,
                current: true,
                completed: false,
            }
        ],  
        finished: false,
    }

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

    test('It should be able to overwrite a practice session', () => {
        let old_state = store.getState()
        store.dispatch(overwritePracticeSession(tmp_practice_session))
        let new_state = store.getState()
        // account for the empty object initializer
        expect(old_state.practice_session[0]).not.toHaveProperty('id')
        // make sure the new contents have an id
        expect(new_state.practice_session.length).not.toBe(0)
        // expect to find the new object in state
        let obj = new_state.practice_session.find((p: any) => p.id === tmp_practice_session.id)
        expect(obj).toBeDefined()
        
    })

    test('It should be able to add a practice session', () => {
        let old_state = store.getState()
        store.dispatch(addPracticeSession(tmp_practice_session))
        let new_state = store.getState()
        // expect a change in length
        expect(old_state.practice_session.length).not.toEqual(new_state.practice_session.length)
        // expect to be able to din the new object
        let obj = new_state.practice_session.find((p: any) => p.id === tmp_practice_session.id)
        expect(obj).toBeDefined()
    })

    test('It should be able to remove a practice session', () => {
        let old_state = store.getState()
        let obj = old_state.practice_session.find((p: any) => p.id === tmp_practice_session.id)
        expect(obj).not.toBeDefined()
        // add the object
        store.dispatch(addPracticeSession(tmp_practice_session))
        let added_state = store.getState()
        obj = added_state.practice_session.find((p: any) => p.id === tmp_practice_session.id)
        expect(obj).toBeDefined()
        // remove it
        store.dispatch(removePracticeSession(tmp_practice_session))
        let removed_state = store.getState()
        obj = removed_state.practice_session.find((p: any) => p.id === tmp_practice_session.id)
        expect(obj).not.toBeDefined()
    })

    test('It should be able to update a practice session', () => {
        let old_state = store.getState()
        let obj = old_state.practice_session.find((p: any) => p.id === tmp_practice_session.id)
        expect(obj).not.toBeDefined()
        // add the object
        store.dispatch(addPracticeSession(tmp_practice_session))
        let added_state = store.getState()
        obj = added_state.practice_session.find((p: any) => p.id === tmp_practice_session.id)
        expect(obj).toBeDefined()
        // update it
        let new_tmp = {... obj}
        new_tmp.items = tmp_practice_session.items.map((i: any) => { return {... i}})
        expect(new_tmp.items[1].completed).toBeFalsy()
        new_tmp.items[1].completed = true
        store.dispatch(updatePracticeSession(new_tmp))
        // ensure the object changed
        obj = added_state.practice_session.find((p: any) => p.id === tmp_practice_session.id)
        expect(obj.items[1]).toBeTruthy()
    })

})