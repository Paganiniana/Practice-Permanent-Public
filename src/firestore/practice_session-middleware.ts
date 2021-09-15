import firebase from 'firebase'
import { Middleware } from 'redux'

import { isSignedIn } from './auth'
import { removeId } from './helpers'

export type PracticeItemType = {
    assignment_id: string,
    minutes: number,
    current: boolean,
    completed: boolean,
}

export type PracticeSessionType = {
    id: string,
    date_created: number, // milliseconds since linux epoch
    user_id: string,
    items: Array<PracticeItemType>,
    finished: boolean,
}

// for local use
const firebaseAddPracticeSession = async function(session: PracticeSessionType) {
    await isSignedIn()

    // remove id for stored object
    let add_obj: any = removeId(session)
    // fix the milliseconds problem
    add_obj.date_created = firebase.firestore.Timestamp.fromMillis(add_obj.date_created)

    const db = firebase.firestore()
    db.collection('practice_session').doc(session.id).set(add_obj)
}

const firebaseUpdatePracticeSession = async function(session: PracticeSessionType) {
    await isSignedIn()

    // remove id for stored object
    let add_obj: any = removeId(session)
    // fix the milliseconds problem
    add_obj.date_created = firebase.firestore.Timestamp.fromMillis(add_obj.date_created)

    const db = firebase.firestore()
    db.collection('practice_session').doc(session.id).update(add_obj)
}

const firebaseRemovePracticeSession = async function(session: PracticeSessionType) {
    await isSignedIn()

    const db = firebase.firestore()
    db.collection('practice_session').doc(session.id).delete()
}


export let firebasePracticeSessionMiddelware: Middleware
firebasePracticeSessionMiddelware = (_storeAPI: any) => (next: any) => (action: any) => {

    if (action.type === 'practice_session/addPracticeSession') {
        firebaseAddPracticeSession(action.payload)
    }

    if (action.type === 'practice_session/updatePracticeSession') {
        firebaseUpdatePracticeSession(action.payload)
    }

    if (action.type === 'practice_session/removePracticeSession') {
        firebaseRemovePracticeSession(action.payload)
    }

    return next(action)
}

if (process && (process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID !== undefined)) {
    firebasePracticeSessionMiddelware = (_storeAPI: any) => (next: any) => (action: any) => {
        // Dummy Middleware,
        // This way we can test components with redux state, but don't worry about polluting Firestore
        console.log('Dummy Practice Middleware called')
        return next(action)
    }
}