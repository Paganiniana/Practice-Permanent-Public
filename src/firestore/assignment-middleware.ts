import firebase from 'firebase'
import { Middleware } from 'redux'
import { isSignedIn } from './auth'
import { removeId } from './helpers'

type AssignmentType = {
    id: string,
    assigned_by_id: string,
    assigned_to_id: string,
    category: string,
    current: boolean,
    description: string,
    name: string,
}

// local use only

const updateFirebaseAssignment = async function(assignment: AssignmentType) {
    await isSignedIn()
    const db = firebase.firestore()
    // TODO: Permission/Error handling

    // get rid of the id field
    let data_obj: any = removeId(assignment)
    db.collection('assignments').doc(assignment.id).update(data_obj)
}

const addFirebaseAssignment = async function(assignment: AssignmentType) {
    await isSignedIn()
    const db = firebase.firestore()
    // TODO: Permission/Error handling

    // get rid of the id field
    let data_obj: any = removeId(assignment)
    db.collection('assignments').doc(assignment.id).set(data_obj)
}

const removeFirebaseAssignment = async function(assignment: AssignmentType) {
    await isSignedIn()
    // TODO: Permission/Error handling
    const db = firebase.firestore()
    db.collection('assignments').doc(assignment.id).delete()
}

export let firebaseAssignmentMiddleware: Middleware
firebaseAssignmentMiddleware = (_storeAPI: any) => (next: any) => (action: any) => {

    if (action.type === 'assignments/updateAssignment') {
        updateFirebaseAssignment(action.payload)
    }

    if (action.type === 'assignments/addAssignment') {
        addFirebaseAssignment(action.payload)
    }

    if (action.type === 'assignments/removeAssignment') {
        removeFirebaseAssignment(action.payload)
    }

    return next(action)
}

if (process && (process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID !== undefined)) {
    firebaseAssignmentMiddleware = (_storeAPI: any) => (next: any) => (action: any) => {
        // Dummy Middleware,
        // This way we can test components with redux state, but don't worry about polluting Firestore
        console.log('Dummy Assignment Middleware called')
        return next(action)
    }
}