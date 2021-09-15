import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import './user-card.css'

import { WeekReport } from '../week-report/week-report'

// type indicates the type of user account that is requested.

type UserCardProps = {
    type: string, 
    email: string, 
    removeFunction: any
}

export const UserCard = (props: UserCardProps) => {

    // compile a list of all accessible users
    let current_user = useSelector((state: any) => state.users.user_current)
    let students = useSelector((state: any) => state.users.user_students)
    let teachers = useSelector((state: any) => state.users.user_teachers)

    let users = [... students, ... teachers]
    let user_data = users.find((u) => {
        return u.unique_email === props.email
    })

    // render the card

    let card
    if (user_data === {} || user_data === undefined) {
        card = <motion.div className="user-card nes-container with-title is-centered">
            <motion.p className="title">{props.email}</motion.p>
            <p>Sorry, we had some trouble finding this user.  Try...</p>
            <ul>
                <li>Making sure they have signed up for Practice Permanent.</li>
                <li>Making sure they have added your email in their settings page.</li>
            </ul>
            {props.removeFunction ? 
                    <button className="nes-btn is-error" onClick={props.removeFunction}>Remove</button>
                    : <div></div> }
        </motion.div> 
    } else {
        card = <motion.div className="user-card nes-container with-title is-centered">
        <motion.p className="title">{user_data.name}</motion.p>
                    <img alt="User Profile" className="nes-avatar is-large is-rounded" src={user_data.photo_url}></img>
                    <WeekReport user_data={user_data}></WeekReport>
                    {props.removeFunction ? 
                    <button className="nes-btn is-error" onClick={props.removeFunction}>Remove</button>
                    : <div></div> }
        </motion.div> 
    }

    return card

}