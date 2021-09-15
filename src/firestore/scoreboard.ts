import firebase from 'firebase'
import { isSignedIn } from './auth'

import store from '../redux/store'
import { setTopListHours } from '../redux/scoreboard.store'

export async function getTopPracticers(n: number) {
    await isSignedIn()

    // firebase.functions().useEmulator('localhost', 5001)
    let getTopPracticersFirebase = firebase.functions().httpsCallable('getTopPracticers')
    
    let res = await getTopPracticersFirebase({n:n}).then((res) => {
        // console.log(res.data)
        // data is in practicers_by_minutes field
        return res.data.practicers_by_minutes
    }).catch((e) => {
        console.log(e.code)
        console.log(e.message)
        console.log(e.details)
    })
    
    if (res) {
        store.dispatch(setTopListHours(res))
    }
}