import React from 'react'
import { useSelector } from 'react-redux'

import {
    IonPage,
    IonContent,
} from '@ionic/react'

// data and types
// import { AssignmentType } from '../../firestore/assignments'
import { RootState } from '../../redux/store'
// import { UserDataType } from '../../firestore/users'


import { AssignmentList } from '../../components/assignment-list/assignment-list'
import { AssignmentAdder } from '../../components/assignment-adder/assignment-adder'
// styles
import '../../theme/page-styles.css'

export const AssignmentListPage = () => {

    const current_user: any  = useSelector((state: RootState) => state.users.user_current)
    const user_assignments: Array<any> = useSelector((state: RootState) => state.assignments.filter((a: any) => a.assigned_to_id === current_user.id))
    
    
    let assignments
    if (user_assignments.length > 0) {
        assignments = <AssignmentList assignments={user_assignments}></AssignmentList>
    } else {
        assignments = <h1>No assignments, yet.</h1>
    }
    return (<IonPage>
        <IonContent>
            <h1 className="page-title">Assignments</h1>
            {assignments}
            <AssignmentAdder assignee_id={current_user?.id}></AssignmentAdder>
        </IonContent>
    </IonPage>)

}