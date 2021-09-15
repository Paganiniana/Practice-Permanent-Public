import React, { useState} from 'react'
import { useSelector } from 'react-redux'

import store from '../../redux/store'
import { updateCurrentUser, addUserData } from '../../redux/user.store'

// this component should be used to (a) create an account where none exists and (b) update an existing account

export const CreateAccountForm = () => {

    // 
    const auth = useSelector((state: any) => state.auth.auth_data)
    const current_user = useSelector((state: any) => state.user_current)

    let [ is_student, setIsStudent ] = useState(false)
    let [ is_teacher, setIsTeacher ] = useState(false)
    let [ instrument, setInstrument ] = useState('')

    if (current_user && current_user.hasOwnProperty('id')) {
        // set default values, the user object exists
        setIsStudent(current_user.is_student)
        setIsTeacher(current_user.is_teacher)
        setInstrument(current_user.instrument)
        // TODO: Add name field
    } else {
        // TODO: Add name field
    }

    function handleTeacher(event: any) {
        setIsTeacher(event.target.checked)
    }

    function handleStudent(event: any) {
        setIsStudent(event.target.checked)
    }

    function handleInstrument(event: any) {
        setInstrument(event.target.value)
    }

    function submit() {
        // behaves differently based on whether or not the current_user exists
        let tmp_user
        if (current_user && current_user.hasOwnProperty('id')) {
            // update existing object
            tmp_user = {... current_user}
            tmp_user.is_student = is_student
            tmp_user.is_teacher = is_teacher
            tmp_user.instrument = instrument
            // dispatch to the store
            store.dispatch(updateCurrentUser(tmp_user))
        } else {
            // create a new object
            tmp_user = {
                id: auth.id,
                instrument: instrument, 
                is_teacher: is_teacher,
                is_student: is_student,
                name: auth.name,
                photo_url: '',
                unique_email: auth.email,
                // use defaults of 3 and 30
                preferred_practice_chunk: 3,
                preferred_practice_duration: 30,
                student_list: [],
                teacher_list: [],
            }
            // dispatch to the store
            store.dispatch(addUserData(tmp_user))
        }
    }

    return (
        <div className="create-account-container">
            <h1 className="page-title">Getting Started:</h1>
            <p>We just need to know whether you are a teacher or a student.</p>
            <label>
                <input type="checkbox" checked={is_teacher} onChange={handleTeacher} className="nes-checkbox"/>
                <span>Teacher</span>
            </label>
            <br/>
            <label>
                <input type="checkbox" checked={is_student} onChange={handleStudent} className="nes-checkbox"/>
                <span>Student</span>
            </label>
            <p>And what is your instrument of choice?</p>
            <label htmlFor="ins-select">
                <div className="nes-select">
                    <select value = {instrument} onChange={handleInstrument} required id="ins-select">
                        <option value="" disabled hidden>Select...</option>
                        <option value="violin">Violin</option>
                        <option value="cello">Cello</option>
                        <option value="viola">Viola</option>
                        <option value="bass">Bass</option>
                    </select>
                </div>
            </label>
            <br/>
            <button onClick={submit} type="button" className="nes-btn is-success">Done</button>
        </div>
    )
}