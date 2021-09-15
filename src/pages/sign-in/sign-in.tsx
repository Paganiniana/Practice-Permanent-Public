import React from 'react'
import { IonPage, IonContent } from '@ionic/react'
import { SignInOutComponent } from '../../components/sign-in-out-component/sign-in-out-component'
// styles
import '../../theme/page-styles.css'

export const SignInPage = () => {

    return <IonPage>
        <IonContent>
            <SignInOutComponent></SignInOutComponent>
        </IonContent>
    </IonPage>
}