import { redux_mock_teacher } from '../test-mocks/redux-mock-data'
const { mockDoc, mockCollection, mockUpdate } = require('firestore-jest-mock/mocks/firestore')
import store from '../redux/store'
import { overwriteCurrentUser, overwriteStudentData, updateCurrentUser } from '../redux/user.store'

// // get info to mock redux
// const { configureStore } = require('redux-mock-store')
// import { firebaseAssignmentMiddleware } from './assignment-middleware'
// import { firebasePracticeSessionMiddelware } from './practice_session-middleware'
// import { firebaseUserMiddleware } from './user-middleware'
// // get the mock store ready
// const mockStore = configureStore([firebaseAssignmentMiddleware, firebasePracticeSessionMiddelware, firebaseUserMiddleware])

// initialize mockstore 

/* TODO:

These tests are to ensure that, when the redux state is manipulated, the correct
firebase/firestore methods are called.  However, to accomplish this, I will have 
to separate the react middleware functions from the listener functions.   Then I
can use a mocked redux store, dispatch various actions, and check the mocked firestore
to ensure that the intended behavior was achieved.

At the moment, if I import the existing middelware objects, the whole file is
evaluated, resulting in the creation of a store object separate from the mock 
store I am using for the tests.  This has created some friction in introducing tests.

*/

describe('Ensure that, when redux updates, firebase is called', () => {

    beforeEach(()=> {
        store.dispatch(overwriteCurrentUser(redux_mock_teacher.users.user_current))
        store.dispatch(overwriteStudentData(redux_mock_teacher.users.user_students))
    })

    it('Should start the tests with information in redux', async () => {
        let state = store.getState()
        expect(state.users.user_current).toBeDefined()
        expect(state.users.user_current).toHaveProperty('id')
        expect(state.users.user_students[0]).toBeDefined()
    })

    it('Should dispatch an update event when the current user is updated', async () => {
        let current_user = store.getState().users.user_current
        let tmp: any = { ... current_user }
        tmp.name = 'Rumple Stiltskin'
        store.dispatch(updateCurrentUser(tmp))
        expect(true)
        // setTimeout(() => {
        //     expect(mockCollection).toBeCalledWith('users')
        //     expect(mockDoc).toBeCalledWith(tmp.id)
        //     expect(mockUpdate).toBeCalledWith(tmp)
        // }, 500)
    })
})