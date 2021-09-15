import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import store from '../../redux/store'
import { addPracticeSession } from '../../redux/practice-session.store'

import {
    IonPage,
    IonContent,
} from '@ionic/react'

import { Link } from 'react-router-dom'

import { UserDataType} from '../../firestore/users'
import { PracticeSessionType } from '../../firestore/practice_session'
import { PixelLoader } from '../../components/pixel-loading-animation/pixel-loading-animation'
import { PracticeSession } from '../../components/practice-session/practice-session'
import { WeekReport } from '../../components/week-report/week-report'
import { PixelIcon } from '../../components/pixel-icon/pixel-icon'
import { nanoid } from '@reduxjs/toolkit'
// styles
import '../../theme/page-styles.css'


type PageState = {
  current_user_data: UserDataType | null,
  current_assignments: Array<any> | null,
  current_practice_session: PracticeSessionType | null,
  today_practice_sessions: Array<PracticeSessionType> | null,
}

export const PracticeRoomPage = () => {
  const current_user = useSelector((state: any) => state.users.user_current)
  const current_assignments = useSelector((state: any) => state.assignments.filter((a: any) => {
    return a.assigned_to_id === current_user.id && a.current
  }))
  const today_practice_sessions = useSelector((state: any) => state.practice_session.filter((s: any) => {
    let today = new Date()
    let s_date = new Date(s.date_created)
    return s_date.getFullYear() === today.getFullYear() && s_date.getDate() === today.getDate() && s_date.getMonth() === today.getMonth() && s.user_id === current_user.id
  }))
  // check to see whether or not a practice session is already in progress
  let current_practice_session = today_practice_sessions.find((p: any) => {
    return !p.finished
  })
  // this little bit of state allows someone to suspend a practice session, once started
  let [is_suspended, setSuspended] = useState(true)
  const toggleSuspended = () => {
    // used by the 'resume' button and the session, itself
    setSuspended(!is_suspended)
  }

  console.log('current practice session', current_practice_session)

  // internal methods
  function createNewSession() {
    if (current_assignments != null && current_user != null) {
      let assignment_list = []
      let start_index = Math.floor(Math.random() * current_assignments.length)
      let num_chunks = Math.floor(current_user.preferred_practice_duration / current_user.preferred_practice_chunk)
      for (let i = 0; i < num_chunks; i++) {
        assignment_list.push(current_assignments[(i + start_index) % current_assignments.length])
      }
      
      // create a list of practice items
      let practice_items = assignment_list.map((item) => {
        return {
          assignment_id: item.id,
          minutes: current_user?.preferred_practice_chunk,
          current: false,
          completed: false,
        }
      })

      // TODO: move this out of the component 
      store.dispatch(addPracticeSession({
        id: nanoid(),
        date_created: new Date(),
        user_id: current_user.id,
        items: practice_items,
        finished: false
      }))

      // set the session page's "suspended" option to false
      setSuspended(false)

    } else {
      console.error('We need an assignment list for this procedure.')
    }
  }

  function hasFinishedSession() {
    if (today_practice_sessions) {
      // get finished sessions
      let finished = today_practice_sessions.map((s: any) => {
        if (s.finished) {
          return s
        }
      })
      return (finished.length) > 0
    } else {  
      return false
    }
  }

  // decide what to render
  let content
    if (current_assignments == null && current_practice_session == null) {
      content = <h1>Loading...</h1>
    } else if (current_practice_session == null && current_assignments != null && current_user != null) {
      content = <div>
        <h1 className="page-title">Practice Room</h1>
        { hasFinishedSession() ? <p>Practice sessions finished, today:{today_practice_sessions?.length}</p> : <p>You haven't finished a practice session yet, today.</p>}
        {current_assignments.length ? <button type="button" onClick={createNewSession} className="nes-btn is-success">Start Practicing</button> : <p>Let's add some assignments so you can start practicing.</p>}
        <WeekReport user_data={current_user}/>
        <Link to="/practiceroom/settings"><button className="nes-btn is-default scroll-btn"><PixelIcon icon="gear"></PixelIcon></button></Link>
      </div>
    } else if (current_practice_session && current_assignments != null && current_user != null && !is_suspended) {
      // content = <h1>Test</h1>
      content = <PracticeSession suspendFunction={toggleSuspended} timer_duration={current_user.preferred_practice_chunk * 60} session={current_practice_session}></PracticeSession>
    } else if (current_practice_session && current_assignments != null && current_user != null && is_suspended) {
      content = <div>
        <h1 className="page-title">Practice Room</h1>
        <p>You havee an ongoing practice session. Let's finish it!</p>
        <button onClick={toggleSuspended} className="nes-btn is-success">Resume</button>
        <WeekReport user_data={current_user}/>
        <Link to="/practiceroom/settings"><button className="nes-btn is-default scroll-btn"><PixelIcon icon="gear"></PixelIcon></button></Link>
        
      </div>
    } else {
      content = <div>
        <p>Loading...</p>
        <p>If you see this for a long time, there might have been an issue.  Try contacting support.</p>
        <PixelLoader />

      </div>
    }

      return (<IonPage>
          <IonContent fullscreen>
              {content}             
          </IonContent>
        </IonPage>)

}