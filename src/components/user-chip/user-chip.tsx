import React from 'react'
import './user-chip.css'
import { useSelector } from 'react-redux'
import { UserDataType } from '../../firestore/users'

type UserChipProps = {
    onClick: any, 
    email: string, 
    type: string 
}

export const UserChip = (props:UserChipProps) => {

    let teachers = useSelector((state: any) => state.users.user_teachers)
    let students = useSelector((state: any) => state.users.user_students)

    let user
    if (props.type === 'teacher') {
        user = teachers.find((u: UserDataType) => u.unique_email === props.email)
    } else if (props.type === 'student') {
        user = students.find((u: UserDataType) => u.unique_email === props.email)
    }

    if (!user) {
        return (<div className="badge-container">
            <button type="button" className="nes-badge" onClick={props.onClick}>
                <span className="is-primary">
                    {props.email}
                </span>
                <i className="nes-icon close badge-icon is-small"></i>
            </button>
        </div>)
    } else {
        return (<div className="badge-container">
            <button type="button" className="nes-badge" onClick={props.onClick}>
                <span className="is-primary">
                    <img alt="Small User Profile" className="nes-avatar is-small" src={user.photo_url}></img>
                    {user.name}
                    <i className="nes-icon close badge-icon is-small"></i>
                </span>
            </button>
        </div>)
    }
}