import firebase from 'firebase'
import firestore from 'firebase/firestore'
import store from '../redux/store'
import { overwritePracticeSession } from '../redux/practice-session.store'

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

// helper function to compare to what is inside redux and 
// add those sessions which aren't there.
function addToRedux(assignment_arr: Array<PracticeSessionType>) {
    let redux_assignments = store.getState().practice_session

    assignment_arr.forEach((p: PracticeSessionType) => {
        let rp = redux_assignments.find((rp: any) => {
            return rp.id === p.id
        })
        if (!rp) {
            store.dispatch(overwritePracticeSession(p))
        }
    })
}

export async function setUserPracticeSessionListener() {
    await isSignedIn()

    const db = firebase.firestore()

    let current_user = firebase.auth().currentUser

    if (current_user) {
        db.collection('practice_session').where('user_id', '==', current_user.uid).onSnapshot((snaphshot) => {
            let practice_sessions: Array<any> = []    
            snaphshot.forEach((doc) => {
                let s = doc.data()
                s.id = doc.id 
                // fix issue where date might get saved as a number
                if (typeof s.date_created !== 'number') {
                    s.date_created = s.date_created.toMillis()
                }
                practice_sessions.push(s)
            })
            addToRedux(practice_sessions)
        }, (error: any) => {
            console.error('There was an error reading the current user practice sessions')
            console.error(error)
        })
    } else {
        throw new Error('Anticipated user would be logged in.')
    }
}

let student_practice_listener_array: Array<any> = []
export async function setStudentPracticeSessionListener() {
    await isSignedIn()
    const db = firebase.firestore()

    let current_user = firebase.auth().currentUser

    if (current_user) {
        // first get students for this user
        db.collection('users').where('teacher_list', 'array-contains', current_user.email).onSnapshot(
            (snapshot) => {
            // ensure that student_assignment_array is not populated
            if (student_practice_listener_array.length != 0) {
                // for now, just clear the array
                student_practice_listener_array.forEach((ar) => {
                    // ar will be the returned 'unsubscribe' function of an onSnapshot value
                    ar()
                })
                student_practice_listener_array = []
            }
            // create a listener for that user's assignments
            snapshot.forEach((doc) => {
                let user =  doc.data()
                user.id = doc.id
                student_practice_listener_array.push(db.collection('practice_session').where('user_id', '==', user.id).onSnapshot((s) => {
                    let practice_sessions: Array<any> = []
                    s.forEach((doc) => {
                        let d = doc.data()
                        d.id = doc.id 
                        // fix issue where date might get saved as a number
                        if (typeof d.date_created !== 'number') {
                            d.date_created = d.date_created.toMillis()
                        }
                        console.log(d.date_created)

                        practice_sessions.push(d)
                    })
                    addToRedux(practice_sessions)
                }, (error: any) => {
                    console.error('The student practice session snapshot failed')
                    console.error(error)
                }))
            })
        }, (error: any) => {
            console.error(error)
        })
    
    } else {
        throw new Error('Expected user to be authenticated')
    }
}


let teacher_practice_listener_array: Array<any> = []
export async function setTeacherPracticeSessionListener() {
    await isSignedIn()
    const db = firebase.firestore()

    let current_user = firebase.auth().currentUser

    if (current_user) {
        // first get students for this user
        db.collection('users').where('student_list', 'array-contains', current_user.email).onSnapshot(
            (snapshot) => {
            // ensure that student_assignment_array is not populated
            if (teacher_practice_listener_array.length != 0) {
                // for now, just clear the array
                teacher_practice_listener_array.forEach((ar) => {
                    // ar will be the returned 'unsubscribe' function of an onSnapshot value
                    ar()
                })
                teacher_practice_listener_array = []
            }
            // create a listener for that user's assignments
            snapshot.forEach((doc) => {
                let user =  doc.data()
                user.id = doc.id
                teacher_practice_listener_array.push(db.collection('practice_session').where('user_id', '==', user.id).onSnapshot((s) => {
                    let practice_sessions: Array<any> = []
                    s.forEach((doc) => {
                        let d = doc.data()
                        d.id = doc.id 
                        // fix issue where date might get saved as a number
                        if (typeof d.date_created !== 'number') {
                            d.date_created = d.date_created.toMillis()
                        }
                        console.log(d.date_created)
                        practice_sessions.push(d)
                    })
                    addToRedux(practice_sessions)
                }, (error: any) => {
                    console.error('The teacher practice session data snapshot failed')
                    console.error(error)
                }))
            })
        }, (error: any) => {
            console.log('The teacher user data snapshot failed')
            console.error(error)
        })
    
    } else {
        throw new Error('Expected user to be authenticated')
    }
}