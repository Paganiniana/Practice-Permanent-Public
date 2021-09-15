import { firebase_mock } from './firebase-mock-data'

// assumption

export const redux_mock_teacher_data = {
    ... firebase_mock.users[0]
}

export const redux_mock_student_data = {
    ... firebase_mock.users[1]
}

export const redux_mock_auth_data = {
    id: firebase_mock.users[0].id,
    name: firebase_mock.users[0].name,
    email: firebase_mock.users[0].unique_email
}

export const redux_mock_teacher = {
    users: {
        user_current: redux_mock_teacher_data,
        user_students: [redux_mock_student_data],
        user_teachers: [{}]
    },
    auth: {
        signed_in: true,
        auth_data: redux_mock_auth_data
    },
    assignments: [
        ... firebase_mock.assignments
    ],
    practice_session: [
        ... firebase_mock.practice_session
    ],
    scoreboard: {
        top_by_hours: [],
        top_by_streak: []
    }
}