import React, { useState } from 'react'
import './student-select-component.css'
import { useSelector } from 'react-redux'
import store from '../../redux/store'

import { UserChip } from '../user-chip/user-chip'
import { updateCurrentUser } from '../../redux/user.store'

export const StudentSelectComponent = () => {

    let current_user = useSelector((state: any) => state.users.user_current)

    let [new_email, setEmail] = useState('')

    function handleTextUpdate(event: any) {
        setEmail(event.target.value)
    }

    function addStudent() {
        let tmp_user = {... current_user}
        tmp_user.student_list = [... current_user.student_list]
        tmp_user.student_list.push(new_email)
        store.dispatch(updateCurrentUser(tmp_user))
    }

    function removeStudent(e: any) {
        let s = {... current_user}
        s.student_list = current_user.student_list.filter((u: any) => u !== e)
        store.dispatch(updateCurrentUser(s))
    }


        // get a list of student chips
        let student_chips = current_user.student_list.map((e: any) => {
            return <UserChip type="student" onClick={() => removeStudent(e)} email = {e}></UserChip>
        })
        return (<div className="student-select-container">
            <div className="student-chip-container">
            {student_chips}
                </div>
        <div className="add-email">
         <div className="nes-field">
             <label htmlFor="add_student_email">Add Student Email</label>
             <input onChange={handleTextUpdate} type="text" id="add_teacher_email" className="nes-input"/>
         </div>
         <button type="button" onClick={addStudent} className="nes-btn is-primary">Add</button>
         </div>
     </div>)

}
