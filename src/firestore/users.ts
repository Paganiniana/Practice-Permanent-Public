import firebase from 'firebase'

import { isSignedIn } from './auth'

import store from '../redux/store'
import { overwriteCurrentUser, overwriteTeacherData, overwriteStudentData } from '../redux/user.store'
import { createSecureServer } from 'node:http2'

import { removeId } from './helpers'

export type UserDataType = {
    id: string,
    instrument: string,
    is_student: boolean,
    is_teacher: boolean,
    name: string,
    photo_url: string,
    preferred_practice_chunk: number,
    preferred_practice_duration: number,
    student_list: Array<string>,
    teacher_list: Array<string>,
    unique_email: string,
}

export const empty_user = {
    id: '',
    instrument: '',
    is_student: false,
    is_teacher: false,
    name: '',
    photo_url: '',
    preferred_practice_chunk: 0,
    preferred_practice_duration: 0,
    student_list: [],
    teacher_list: [],
    unique_email: '',
}

// Listen to firebase, update Redux

export async function setCurrentUserListener() {
    await isSignedIn()

    const db = firebase.firestore()

    let current_user = firebase.auth().currentUser

    if (current_user) {
        db.collection('users').doc(current_user.uid).onSnapshot(
            (snapshot: any) => {

            let user = snapshot.data()
            user.id = snapshot.id
            store.dispatch(overwriteCurrentUser(user))
        }, (error: any) => {
            console.error('There was an error getting a snapshot of the current user')
            console.error(error)
        })
    } else {
        throw new Error('Anticipated user would be signed in.')
    }
}

export async function setStudentUserListener() {
    await isSignedIn()

    const db = firebase.firestore()

    let current_user = firebase.auth().currentUser

    if (current_user) {
        db.collection('users').where('teacher_list', 'array-contains', current_user.email).onSnapshot(
            (snapshot: any) => {
            let students: Array<any> = []
            snapshot.forEach((doc: any) => {
                let user = doc.data()
                user.id = doc.id
                students.push(user)
            })
            store.dispatch(overwriteStudentData(students))
        }, (error: any) => {
            console.error('There was an error getting a snapshot of all students')
            console.error(error)
        })
    } else {
        throw new Error('Anticipated user would be signed in.')
    }
}

export async function setTeacherUserListener() {
    await isSignedIn()

    const db = firebase.firestore()

    let current_user = firebase.auth().currentUser

    if (current_user) {
        db.collection('users').where('student_list', 'array-contains', current_user.email).onSnapshot(
            (snapshot: any) => {
            let teachers: Array<any> = []
            snapshot.forEach((doc: any) => {
                let user = doc.data()
                user.id = doc.id
                teachers.push(user)
            })
            store.dispatch(overwriteTeacherData(teachers))
        }, (error: any) => {
            console.error('There was an error getting a snapshot of all teachers')
            console.error(error)
        })
    } else {
        throw new Error('Anticipated user would be signed in.')
    }

}