import React, { useState } from 'react'
import './week-report.css'
import store from '../../redux/store'
import { useSelector } from 'react-redux'

import { UserDataType } from '../../firestore/users'
import { PracticeSessionType } from '../../firestore/practice_session'

type WeekReportProps = {
    user_data: UserDataType,
}

type WeekReportState = {
    // TODO: FIX, this should be a list of session types, but the timestamp object was being uncooperative
    session_list: Array<any> | null,
    days: Array<any>, // length 7, one for each day
}

// helper function
function getLastWeekPracticeSessions(session_list: Array<PracticeSessionType>) {
    let limit = new Date() // now
    limit.setTime(limit.getTime() - (7 * 24 * 60 * 60 * 1000)) // minus one-week in milliseconds
    limit.setHours(0)
    limit.setMinutes(0)

    // session 'date_created' is stored as a number of Milliseconds

    return session_list.filter((s: PracticeSessionType) => {
        return s.date_created > limit.getTime()
    })

}

export const WeekReport = (props: WeekReportProps) => {

    // get the practice sessions that belong to the given user
    let practice_sessions = useSelector((state: any) => 
        state.practice_session.filter((p: PracticeSessionType) => p.user_id === props.user_data.id))

    let this_week_sessions = getLastWeekPracticeSessions(practice_sessions)
    // internal functions

    const getDayOfWeek = (d: Date) => {
        let i = d.getDay()
        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        return days[i]
    }

    const getEmptyListOfDays = () => {
        let days = []
        for (let i = 0; i<7; i++) {
            let day = new Date()
            day.setTime(day.getTime() - (i * 24 * 60 * 60 * 1000))
            days.push({
                finished: false,
                day_name: getDayOfWeek(day),
            })
        }
        // send in order of oldest to newest
        return days.reverse()
    }

    const computeDays= (session_list: Array<PracticeSessionType>) => {
        let days_list = []
        for (let i = 0; i<7; i++) {
            let day = new Date()
            day.setTime(day.getTime() - (i * 24 * 60 * 60 * 1000))
            let session = session_list.find((s) => {
                // TODO: Fix, this is just a temporary hack while timestamp is giving me trouble
                let session_date = new Date(s.date_created)
                // compare year month and day
                if (session_date.getFullYear() === day.getFullYear() && session_date.getMonth() === day.getMonth() && session_date.getDate() === day.getDate()) {
                    return s
                } else {
                    return false
                }
            })
            if (session) {
                days_list.push({
                    finished: session.finished,
                    day_name: getDayOfWeek(day),
                })
            } else {
                days_list.push({
                    finished: false,
                    day_name: getDayOfWeek(day),
                })
            }
        }
        return days_list.reverse() // return in order of oldest-day first
    }

    // compute what and how to render

    let day_list: Array<any>
    if (this_week_sessions.length > 0) {
        day_list = computeDays(this_week_sessions)
    } else {
        day_list = getEmptyListOfDays()
    }

    let days 
    if (day_list) {
        let tmp = []
        for (let i = 0; i<day_list.length; i++) {
            tmp.push(<div key={String(i)} className="day">
            <span className="day-name">{day_list[i].day_name}</span>
            <span className={day_list[i].finished ? 'practice yes-practice' : 'practice  no-practice'}></span>
            </div>)
        }
        days = tmp
    } else {
        days = <div></div>
    }

    return <div className="week-report-container">
        <div className="week-report-title">
            <h2>This Week</h2>
        </div>
        <div className="week-report-contents">
            {days}
        </div>
    </div>
}
