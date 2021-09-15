// information to mock firebase
import firebase from 'firebase'
import { Middleware } from 'redux'
import { isSignedIn } from './auth'
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

// Use Middleware to keep firebase up to date

const updateUser = async function(user: UserDataType) {
    await isSignedIn()
    const db = firebase.firestore()
    // TODO handle errors when updating a user you don't have access to

    // get rid of the id field
    let update_obj: any = removeId(user)
    // Object.defineProperty(update_obj, 'id', {configurable: true})
    db.collection('users').doc(user.id).update(update_obj)
}

const createUser = async function(user: UserDataType) {
    await isSignedIn()
    const db = firebase.firestore()

    // get rid of the id field
    let data_obj: any = removeId(user)
    db.collection('users').doc(user.id).set(data_obj)
}

export let firebaseUserMiddleware: Middleware

firebaseUserMiddleware = (_storeAPI: any) => (next: any) => (action: any) => {

    if (action.type === 'users/updateCurrentUser') {
        updateUser(action.payload)
    }

    if (action.type === 'users/addUserData') {
        createUser(action.payload)
    }

    if (action.type === 'users/updateStudentData') {
        updateUser(action.payload)
    }

    return next(action)
}

if (process && (process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID !== undefined)) {
    firebaseUserMiddleware = (_storeAPI: any) => (next: any) => (action: any) => {
        // Dummy Middleware,
        // This way we can test components with redux state, but don't worry about polluting Firestore
        console.log('Dummy User Middleware called')
        return next(action)
    }
}
