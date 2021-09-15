import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { signAuthIn, signAuthOut } from '../../firestore/auth'

export const SignInOutComponent = () => {

    const auth = useSelector((state: any) => state.auth)
    let history = useHistory()

    function signOutHandler() {
        signAuthOut().then(() => {
            history.push('/')
        })
    }

    if (auth.signed_in) {
        return (<div>
            <h1>Sign Out</h1>
            <p>It looks like you are signed in as {auth.auth_data.email}.   
                If you would like to change this, feel free to sign out:</p>
                <button onClick={signOutHandler} className="nes-btn is-error">Sign Out</button>
        </div>)
    } else {
        // ask the user to sign in 
        return (<div>
            <h1>Sign In</h1>
            <p>If you already have an account, we'll send you straight to the practice room.  If you don't, we'll want to ask a couple of questions to get us started.</p>
            <p>Please Sign In:</p>
            <button onClick = {signAuthIn} className="nes-btn is-primary">
                <i className="nes-icon google is-large"></i>
            </button>
        </div>)
    }

}