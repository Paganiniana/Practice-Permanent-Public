import React from 'react'
// import renderer from 'react-test-renderer'
import { render, cleanup, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { UserCard } from './user-card'

import store from '../../redux/store'
import { Provider } from 'react-redux'
import { overwriteCurrentUser, overwriteStudentData, overwriteTeacherData} from '../../redux/user.store'
import { redux_mock_teacher } from '../../test-mocks/redux-mock-data'

describe('User Card Component', () => {

    beforeEach(() => {
        store.dispatch(overwriteCurrentUser(redux_mock_teacher.users.user_current))
        store.dispatch(overwriteTeacherData(redux_mock_teacher.users.user_teachers))
        store.dispatch(overwriteStudentData(redux_mock_teacher.users.user_students))
    })

    afterEach(() => {
        cleanup()
    })

    test('it should take three arguments as props', () => {
        let mockRemove = () => true
        let res = render(<Provider store={store}>
            <UserCard type="student" email={redux_mock_teacher.users.user_students[0].unique_email} removeFunction={mockRemove} />
        </Provider>)
        // assert that it renders
        let comp = res.container.querySelector('.user-card')
        expect(comp).toBeDefined()
    })

    test('it should display the name, image, and week report of teh given user', () => {
        let mockRemove = () => true
        let res = render(<Provider store={store}>
            <UserCard type="student" email={redux_mock_teacher.users.user_students[0].unique_email} removeFunction={mockRemove} />
        </Provider>)
        // assert that a name 
        let name = res.container.querySelector('.title')
        expect(name?.innerHTML).toEqual(redux_mock_teacher.users.user_students[0].name)  
        // expect a week report 
        let week_report = res.container.querySelector('.week-report-container')
        expect(week_report).toBeDefined()
        // expect a remove button
        expect(screen.getByText('Remove')).toBeDefined()
    })

    test('it should call the remove function when button is presed', () => {
        let remove_called = false
        let mockRemove = () => {
            remove_called = true
        }
        let res = render(<Provider store={store}>
            <UserCard type="student" email={redux_mock_teacher.users.user_students[0].unique_email} removeFunction={mockRemove} />
        </Provider>)
        expect(remove_called).toBeFalsy()
        fireEvent.click(screen.getByText('Remove'))
        expect(remove_called).toBeTruthy()
    })
})