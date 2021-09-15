import React, { useState } from 'react'
import {motion, AnimatePresence, AnimateSharedLayout, useElementScroll } from 'framer-motion'
import { useSelector } from 'react-redux'
import './user-list.css'

import { UserCard } from '../user-card/user-card'
import { UserDetailsFloat } from '../user-details-float/user-details-float'

type UserListProps = {
    type: string,
}

export const UserList = (props: UserListProps) => {

    let users: Array<string> = []
    let current_user = useSelector((state: any) => state.users.user_current)

    if (current_user.is_student) {
        users = current_user.teacher_list
    } else if (current_user.is_teacher) {
        users = current_user.student_list
    }
    const [selected_user, setSelected] = useState('')

    let user_cards = users.map((u: string) => {
        let index = users.findIndex((e) => e===u)
        return <motion.a key={String(index)}  onClick={() => setSelected(u)}>
            <motion.div layoutId={u}>
            <UserCard type={props.type} email={u} removeFunction={null}></UserCard>
            </motion.div>
        </motion.a>
    })

    let detail_float
    if (selected_user) {
        detail_float = <UserDetailsFloat user_email={selected_user} closeFloatFunc={() => setSelected('')}></UserDetailsFloat>
    } else {
        detail_float = <div></div>
    }

    return (<AnimateSharedLayout>
            <motion.div layout className="user-list-container">
                {user_cards}
            </motion.div>
            <AnimatePresence>
                { detail_float}
            </AnimatePresence>
        </AnimateSharedLayout>)

}