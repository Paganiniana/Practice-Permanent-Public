import React from 'react'
import { useSelector } from 'react-redux'
import {motion} from 'framer-motion'

import './user-details-float.css'

import { AssignmentAdder } from '../../components/assignment-adder/assignment-adder'
import { AssignmentList } from '../../components/assignment-list/assignment-list'

import { UserDataType } from '../../firestore/users'
import { AssignmentType } from '../../firestore/assignments'

import { PreferredPracticeChunk } from '../preferred-practice-chunk/preferred-practice-chunk'
import { PreferredPracticeTime } from '../preferred-practice-time/preferred-practice-time'
import { WeekReport } from '../week-report/week-report'

type UserDetailsFloatProps = {
    user_email: string,
    closeFloatFunc: any,
}

export const UserDetailsFloat = (props: UserDetailsFloatProps) => {

    // get current user, selected user, and selected user assignments
    let current_user: UserDataType = useSelector((state: any) => state.users.user_current)
    // for now, assume it is a student
    let selected_user: UserDataType = useSelector((state: any) => state.users.user_students.find((s: UserDataType) => {
        return s.unique_email === props.user_email
    }))
    
    let assignment_list: Array<AssignmentType> = useSelector((state: any) => state.assignments.filter((a: AssignmentType) => {
        return a.assigned_to_id === selected_user.id
    }))

    // render and return float
    let assignments
    let assignment_adder
    if (assignment_list != null && selected_user != null) {
        assignments = <AssignmentList assignments={assignment_list}></AssignmentList>
        assignment_adder = <AssignmentAdder assignee_id={selected_user.id} ></AssignmentAdder>
    } else {
        assignments = <div></div>
        assignment_adder = <div></div>
    }
    
    // create user details display
    let user_details
    if (current_user?.is_teacher && selected_user != null) {
        user_details = <div className="input-group">
            <PreferredPracticeTime disabled={false} user_data={selected_user}/>
            <PreferredPracticeChunk disabled={false} user_data={selected_user}/>
            <WeekReport user_data={selected_user} />
        </div>
    }


    return <motion.div className="user-float-container" layoutId={props.user_email} layout>
        <motion.div className="nes-container user-float-content" layout>
            <motion.button className="nes-btn close-button" onClick={props.closeFloatFunc}>
            <motion.i className="nes-icon close is-small"></motion.i>
            </motion.button>
            <motion.h1>{ selected_user.hasOwnProperty('id') ? selected_user.name : 'User Details' }</motion.h1>
            {user_details}
            {assignments}
            {assignment_adder}
        </motion.div> 
    </motion.div>
}