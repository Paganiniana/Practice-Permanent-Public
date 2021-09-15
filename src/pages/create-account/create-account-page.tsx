import React from 'react'
import { IonPage, IonContent } from '@ionic/react'

import { CreateAccountForm } from '../../components/create-account-form/create-account-form'
// styles
import '../../theme/page-styles.css'

export const CreateAccountPage = () => {
    return <IonPage>
        <IonContent>
            <CreateAccountForm></CreateAccountForm>
        </IonContent>
    </IonPage>
}