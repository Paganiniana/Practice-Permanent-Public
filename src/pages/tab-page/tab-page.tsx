import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import {
    IonTabBar,
    IonTabs,
    IonTabButton,
    IonLabel,
    IonRouterOutlet,
    isPlatform,    
 } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { PixelIcon } from '../../components/pixel-icon/pixel-icon'
import './tab-page.css'

// Pages
import { StudentListPage } from '../student-list-page/student-list-page'
import { AssignmentListPage } from '../assignment-list-page/assignment-list-page'
import { PracticeRoomPage } from '../practice-room/practice-room'
import { UserInfoPage } from '../user-info/user-info'
import { LeaderBoardsPage } from '../leaderboards/leaderboards'
import { UserDataType } from '../../firestore/users'

type TabPageProps = {
    current_user: UserDataType,
}

type TabPageState = {
    mobile_safari_keyboard: boolean,
}

class TabPageClass extends React.Component<TabPageProps, TabPageState> {

    keyboard_listener: EventListener | null = null;
    scroll_listener: EventListener | null = null;
    tab_ref: any;
    tab_ref_scroll_listener: EventListener | null = null;

    constructor(props: TabPageProps) {
        super(props)

        // tab bar ref
        this.tab_ref = React.createRef()

        this.state = {
            mobile_safari_keyboard: false,
        }
    }

    componentDidMount() {
        this.setKeyboardListener()
    }

    handleTabScroll(e: any) {
        e.preventDefault()
    }

    setKeyboardListener() {
        if (!this.keyboard_listener && isPlatform('mobileweb') && isPlatform('ios')) {
            // fix issue where tab bar continues to display when user uses keyboard
            this.keyboard_listener = document.onscroll = (e) => {
                // get the active element type
                let active_element_type = document.activeElement?.nodeName
                let is_input = (active_element_type && (active_element_type === 'INPUT' || active_element_type === 'TEXTAREA' || active_element_type === 'SELECT'))
                if (document.body.getBoundingClientRect().top < -30 && is_input) {
                    this.setState({
                        mobile_safari_keyboard: true,
                    })
                } else {
                    this.setState({
                        mobile_safari_keyboard: false,
                    })
                }
            }
        }
    }

    render() {
        let tabBar 
    if (this.props.current_user && this.props.current_user.is_teacher) {
        tabBar = <IonTabBar onScroll={this.handleTabScroll} ref={this.tab_ref} className={this.state.mobile_safari_keyboard ? 'keyboard-hide' : ''} slot="bottom">
        <IonTabButton tab="Students" href="/students">
        <PixelIcon icon="users"/>
            <IonLabel>Students</IonLabel>
        </IonTabButton>
        <IonTabButton tab="Assignmnets" href="/assignments">
            <PixelIcon icon="calendar"/>
            <IonLabel>Assignments</IonLabel>
        </IonTabButton>
        <IonTabButton tab="PracticeRoom" href="/practiceroom">
            <PixelIcon icon="clock"/>
            <IonLabel>Practice</IonLabel>
        </IonTabButton>
        <IonTabButton tab="Leaderboards" href="/leaderboards">
            <PixelIcon icon="podium"/>
            <IonLabel>Leaderboard</IonLabel>
        </IonTabButton>
    </IonTabBar>
    } else {
        tabBar = <IonTabBar ref={this.tab_ref} className={this.state.mobile_safari_keyboard ? 'keyboard-hide' : ''} slot="bottom">
        <IonTabButton tab="Assignmnets" href="/assignments">
          <PixelIcon icon="calendar" />
          <IonLabel>Assignments</IonLabel>
        </IonTabButton>
        <IonTabButton tab="PracticeRoom" href="/practiceroom">
          <PixelIcon icon="clock"/>
          <IonLabel>Practice</IonLabel>
        </IonTabButton>
        {/* <IonTabButton tab="Leaderboards" href="/leaderboards">
          <PixelIcon icon="podium"/>
          <IonLabel>Leaderboard</IonLabel>
        </IonTabButton> */}
      </IonTabBar>
    }

    // TODO: add keyboard-hide class for mobile, again
    return <IonReactRouter>
        <IonTabs>
            <IonRouterOutlet>
                <Route path="/:tab(Students)" component={StudentListPage} exact={true} />
                <Route path="/:tab(Assignments)" component={AssignmentListPage} exact={true} />
                <Route path="/:tab(Leaderboards)" component={LeaderBoardsPage} exact={true} />
                <Route path="/:tab(PracticeRoom)" component = {PracticeRoomPage} exact={true} />
                <Route path="/:tab(PracticeRoom)/settings" component={UserInfoPage} />
                <Route path="/" render={() => <Redirect to="/assignments" />} exact={true} />
            </IonRouterOutlet>
            {tabBar}
        </IonTabs>
    </IonReactRouter>
    }

}

const mapStateToProps = (state: any) => ({current_user: state.users.user_current})
export const TabPage = connect(mapStateToProps)(TabPageClass)