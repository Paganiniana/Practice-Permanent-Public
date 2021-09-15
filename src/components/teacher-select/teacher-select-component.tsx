import React, { useState } from 'react'
import './teacher-select-component.css'
import { useSelector } from 'react-redux'
import store from '../../redux/store'

import { UserCard } from '../user-card/user-card'
import { updateCurrentUser } from '../../redux/user.store'

export const TeacherSelectComponent = () => {

    let current_user = useSelector((state: any) => state.users.user_current)

    let [new_email, setEmail] = useState('')

    function handleTextUpdate(event: any) {
        setEmail(event.target.value)
    }

    function addTeacher() {
        let tmp_user = {... current_user}
        tmp_user.teacher_list = [... current_user.teacher_list]
        tmp_user.teacher_list.push(new_email)
        store.dispatch(updateCurrentUser(tmp_user))
    }

    function removeTeacher(e: any) {
        let s = {... current_user}
        s.teacher_list = current_user.teacher_list.filter((u: any) => u !== e)
        store.dispatch(updateCurrentUser(s))
    }


        let teacher_chips = current_user.teacher_list.map((e: any) => {
            return <UserCard type = "teacher" removeFunction={() => removeTeacher(e)} email={e}></UserCard>
        })
        return (<div className="teacher-select-container">{teacher_chips}
           <div className="add-email">
            <div className="nes-field">
                <label htmlFor="add_teacher_email">Add Teacher Email</label>
                <input onChange={handleTextUpdate} type="text" id="add_teacher_email" className="nes-input"/>
            </div>
            <button type="button" onClick={addTeacher} className="nes-btn is-primary">Add</button>
            </div>
        </div>)

}