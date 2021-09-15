import React from 'react'

import {
    IonPage,
    IonContent,
} from '@ionic/react'

import { Scoreboard } from '../../components/scoreboard/scoreboard'
// styles
import '../../theme/page-styles.css'

export class LeaderBoardsPage extends React.Component {

    render() {
        return <IonPage>
            <IonContent>
                <Scoreboard limit={10} />
            </IonContent>
        </IonPage>
    }
}