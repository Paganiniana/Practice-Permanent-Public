import firebase from 'firebase'
import store from '../redux/store'
import { isSignedIn } from './auth'
import { overwriteAssignment } from '../redux/assignment.store'

export type AssignmentType = {
    id: string,
    assigned_by_id: string,
    assigned_to_id: string,
    category: string,
    current: boolean,
    description: string,
    name: string,
}

// helper function to compare to what is inside redux and 
// add those assignments which aren't there.
function addToRedux(assignment_arr: Array<AssignmentType>) {
    let redux_assignments = store.getState().assignments

    assignment_arr.forEach((a: AssignmentType) => {
        let ra = redux_assignments.find((ra: any) => {
            return ra.id === a.id
        })
        if (!ra) {
            store.dispatch(overwriteAssignment(a))
        }
    })
}


// assignment listener
export async function setAssignmentListener() {
    await isSignedIn()
    const db = firebase.firestore()

    let current_user = firebase.auth().currentUser

    if (current_user) {
        // listen to current user assignments
    db.collection('assignments').where('assigned_to_id', '==', current_user.uid).onSnapshot((snapshot) => {
        let assignments: Array<any> = []
        snapshot.forEach((doc) => {
            let d = doc.data()
            d.id = doc.id
            assignments.push(d)
        })
        addToRedux(assignments)
    }, (error: any) => {
            console.error('There was an error the current assignment snapshot')
            console.error(error)
    })

    // listen to student assignments
    } else {
        throw new Error('Expected user to be authenticated')
    }
}

// internal use only
let student_assignment_array: Array<any> = []

export async function setStudentAssignmentListener() {
    await isSignedIn()
    const db = firebase.firestore()

    let current_user = firebase.auth().currentUser

    if (current_user) {
        // first get students for this user
        db.collection('users').where('teacher_list', 'array-contains', current_user.email).onSnapshot((snapshot) => {
            // ensure that student_assignment_array is not populated
            if (student_assignment_array.length != 0) {
                // for now, just clear the array
                student_assignment_array.forEach((ar) => {
                    // ar will be the returned 'unsubscribe' function of an onSnapshot value
                    ar()
                })
                student_assignment_array = []
            }
            // create a listener for that user's assignments
            snapshot.forEach((doc) => {
                let user =  doc.data()
                user.id = doc.id
                student_assignment_array.push(db.collection('assignments').where('assigned_to_id', '==', user.id).onSnapshot((as) => {
                    let assignments: Array<any> = []
                    as.forEach((doc) => {
                        let d = doc.data()
                        d.id = doc.id 
                        assignments.push(d)
                    })
                    addToRedux(assignments)
                }, (error: any) => {
                    console.error('There was an error getting the student assignment snapshot')
                    console.error(error)
                }))
            })
        }, (error: any) => {
            console.error('There was an error getting all students for an assignment snapshot')
            console.error(error)
        })
    
    } else {
        throw new Error('Expected user to be authenticated')
    }
}