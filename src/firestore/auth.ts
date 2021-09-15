import firebase from 'firebase'
import { isPlatform } from '@ionic/react'
import { signIn, signOut } from '../redux/auth.store'
import store from '../redux/store'

// returns a promise that resolves when auth().currentUser exists

export let isSignedIn: Function
isSignedIn = function() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user?.hasOwnProperty('uid')) {
                resolve(null)
            }   else {
                // do I need to do anything, here?
            }
        })
    })
}

if (process && (process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID !== undefined)) {
    isSignedIn = function() {
        return new Promise((resolve, reject) => {
            resolve(null)
        })
    }
}

export function signAuthOut() {
    // anything else?
    return firebase.auth().signOut()
}

function signInWeb() {
    // tried signInWithPopup, but it caused an error on iOS Safari PWA
        // use signInWithRedirect instead
        let provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(provider)
}

export function signAuthIn() {
    // aggregator, this function accounts for "what sort of device we're running on"
    if (isPlatform('mobileweb')) {
        signInWeb()
    } else {
        signInWeb() 
    }
}   

// listen to firebase, update Redux
export function setAuthListener() {
    console.log('Setting Auth listener')
    if (firebase.auth().currentUser) {
        signIn(firebase.auth().currentUser)
    }
    firebase.auth().onAuthStateChanged((user) => {
        console.log('Auth state changed.', user)
        if (user?.hasOwnProperty('uid')) {
            store.dispatch(signIn({
                id: user.uid,
                name: user.displayName,
                email: user.email,
            }))
        }   else {
            store.dispatch(signOut())
        }
    })
}

export function setAuthReduxListener() {
    // report just on the 'auth' property of the store
    let listener = () => {
        console.log('Auth state changed')
        console.log(store.getState())
    }
    store.subscribe(listener)
}