import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import LogRocket from 'logrocket'
import { Provider } from 'react-redux'

/* Redux */
import store from './redux/store'
import { setAuthListener, setAuthReduxListener } from './firestore/auth'
import { setAssignmentListener, setStudentAssignmentListener } from './firestore/assignments'
import { setCurrentUserListener, setStudentUserListener, setTeacherUserListener } from './firestore/users'
import { setUserPracticeSessionListener, setStudentPracticeSessionListener, setTeacherPracticeSessionListener } from './firestore/practice_session'

// initialize as firebase app
import firebase from 'firebase'
import { firebaseConfig } from './firebase-config'
firebase.initializeApp(firebaseConfig)

// Initialize firebase auth listener

setAuthListener()
setAuthReduxListener()
setAssignmentListener()
setStudentAssignmentListener()
setCurrentUserListener()
setStudentUserListener()
setTeacherUserListener()
setTeacherPracticeSessionListener()
setUserPracticeSessionListener()
setStudentPracticeSessionListener()

// initialize Analytics
firebase.analytics()

// initialize Log Rocket
if (window.location.hostname === 'practicepermanent.app') {
    // only use LogRocket in production
    LogRocket.init('zwvaok/practice-permanent')
}



ReactDOM.render(<Provider store={store}>
    <App></App>
</Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
