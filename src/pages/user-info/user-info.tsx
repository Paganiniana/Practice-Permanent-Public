import React from 'react'
import { 
    IonPage, 
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonRouterLink 
} from '@ionic/react'
import { useSelector } from 'react-redux'

import {StudentSelectComponent} from '../../components/student-select/student-select-component'
import {TeacherSelectComponent} from '../../components/teacher-select/teacher-select-component'
import { PixelLoader } from '../../components/pixel-loading-animation/pixel-loading-animation'
import { PreferredPracticeTime } from '../../components/preferred-practice-time/preferred-practice-time'
import { PreferredPracticeChunk } from '../../components/preferred-practice-chunk/preferred-practice-chunk'
import { SignInOutComponent } from '../../components/sign-in-out-component/sign-in-out-component'
import { BackButton } from '../../components/back-button/back-button'

// styles
import '../../theme/page-styles.css'

export const UserInfoPage = () => {

    const current_user = useSelector((state: any) => state.users.user_current)

    let content
    if (current_user == null) {
        content = <div>
        <p>Loading...</p>
        <PixelLoader></PixelLoader>
        </div>
    } else {
        if (current_user.is_student) {
            // For now, disable student's ability to adjust their own practice preferences
            content = <div>
                <TeacherSelectComponent></TeacherSelectComponent>
                <PreferredPracticeTime disabled={true} user_data={current_user}/>
                <PreferredPracticeChunk disabled={true} user_data = {current_user} />
            </div>
        }
        if (current_user.is_teacher) {
            content = <div>
                <StudentSelectComponent></StudentSelectComponent>
                <PreferredPracticeTime disabled={false} user_data={current_user}/>
                <PreferredPracticeChunk disabled={false} user_data = {current_user} />
            </div>
        }
    }
    return (<IonPage>
        <IonContent className="has-header">
            <IonHeader>
                <IonToolbar>
                    <IonRouterLink routerLink="/practiceroom" routerDirection="back">
                        <BackButton />
                    </IonRouterLink>
                </IonToolbar>
            </IonHeader>
            <h1 className="page-title">Settings</h1>
            {content}
            <SignInOutComponent></SignInOutComponent>
        </IonContent>
    </IonPage>)

}