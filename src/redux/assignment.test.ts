import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { userReducer } from './user.store'
import { authReducer } from './auth.store'
import { assignmentReducer } from './assignment.store'
import { practiceReducer } from './practice-session.store'
import { scoreboardReducer } from './scoreboard.store'
import { redux_mock_teacher, redux_mock_teacher_data } from '../test-mocks/redux-mock-data'

// actions
import { addAssignment, removeAssignment, updateAssignment, overwriteAssignment, overwriteAssignmnets } from './assignment.store'

// Confirm that create/add/delete functions work as expected

describe('Redux: Assignments Slice', () => {

    let tmp_assignment = {
        id: '1234',
        assigned_by_id: 'assignerid',
        assigned_to_id: 'assignedtoid',
        category: 'test',
        current: true,
        description: 'test',
        name: 'test'
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

    test('It should be able to overwrite the existing assignments in bulk', () => {
        let current_state = store.getState()
        expect(current_state.assignments).toBeInstanceOf(Array)
        // overwrite all assignments
        store.dispatch(overwriteAssignmnets(redux_mock_teacher.assignments))
        // check against new state
        let new_state = store.getState()
        expect(new_state.assignments.length).not.toBe(redux_mock_teacher.assignments.length)
        expect(new_state.assignments[0]).toBeInstanceOf(Object)
        console.log(new_state.assignments)
        new_state.assignments.map((na: any) => {
            let obj = redux_mock_teacher.assignments.find((a: any) => {
                return a.id === na.id
            })
            if (na.hasOwnProperty('id')) {
                // TODO: fix case for empty object (set in initial state)
                expect(obj).toBeDefined()
            }
        })
        // TODO: perform more intensive type checks
    })

    test('It should be able to overwrite the existing assignments one by one', () => {
        let current_state = store.getState()
        expect(current_state.assignments).toBeInstanceOf(Array)
        // overwrite all assignments
        redux_mock_teacher.assignments.forEach((a: any) => {
            store.dispatch(overwriteAssignment(a))
        })
        // check against new state
        let new_state = store.getState()
        expect(new_state.assignments.length).toBe(redux_mock_teacher.assignments.length + 1)
        expect(new_state.assignments[0]).toBeInstanceOf(Object)
        console.log(new_state.assignments)
        new_state.assignments.map((na: any) => {
            let obj = redux_mock_teacher.assignments.find((a: any) => {
                return a.id === na.id
            })
            if (na.hasOwnProperty('id')) {
                // TODO: fix case for empty object (set in initial state)
                expect(obj).toBeDefined()
            }
        })
        // TODO: perform more intensive type checks
    })

    test('It should be able to add an assignment to those existing', () => {
        let current_assignments = store.getState().assignments
        // perform an addition
        
        let tmp = tmp_assignment

        store.dispatch(addAssignment(tmp))
        let new_assignments = store.getState().assignments
        expect(current_assignments.length).not.toEqual(new_assignments.length)

        let test_find = new_assignments.find((a: any) => {
            return a.id === '1234' && a.assigned_by_id === 'assignerid'
        })
        expect(test_find).toBeDefined()
    })

    test('It should be able to remove an assignment, once added', () => {
        // add an assignment to remove
        store.dispatch(addAssignment(tmp_assignment))
        // get the state, then remove it
        let added_state: Array<any> = store.getState().assignments
        store.dispatch(removeAssignment(tmp_assignment))
        let removed_state: Array<any> = store.getState().assignments
        // test equality
        expect(added_state.length).not.toEqual(removed_state.length)
        // make sure the tmp object is not to be found in the state
        let tmp_find = removed_state.find((a: any) => {
            return a.id === tmp_assignment.id
        })
        expect(tmp_find).not.toBeDefined()
    })

    test('It should be able to update an assignment', () => {
        // add an assignment to the store
        store.dispatch(addAssignment(tmp_assignment))
        // get the state for comparison
        let added_state = store.getState()
        // make a change
        let new_tmp = {... tmp_assignment}
        new_tmp.description = 'updated'
        store.dispatch(updateAssignment(new_tmp))
        let updated_state = store.getState()
        // do the comparison
        let old_version = added_state.assignments.find((a: any) => {
            return a.id === new_tmp.id
        })
        let new_version = updated_state.assignments.find((a: any) => {
            return a.id === new_tmp.id
        })
        // check to see if the object was actually changed
        expect(old_version.description).not.toEqual(new_version.description)
    })
})