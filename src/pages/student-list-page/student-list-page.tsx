import React from 'react'

import {
    IonPage,
    IonContent,
} from '@ionic/react'

// styles
import '../../theme/page-styles.css'

import { UserList } from '../../components/user-list/user-list'

export const StudentListPage = () => {
  return <IonPage>
  <IonContent fullscreen>
    <h1 className="page-title">Student List</h1>
      <UserList type="student"></UserList>
  </IonContent>
</IonPage>
}
