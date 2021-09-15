import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import {
  IonApp,
  IonLabel,
  IonPage,
  IonContent,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

/* Custom styles */
import './theme/page-styles.css'

/* Ionic platform library */

import { isPlatform } from '@ionic/react'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'

/* Pages */
import { SignInPage } from './pages/sign-in/sign-in'
import { CreateAccountPage } from './pages/create-account/create-account-page'
import { TabPage } from './pages/tab-page/tab-page'
/* Components */
import { PixelIcon } from './components/pixel-icon/pixel-icon'

/**
 * The App.tsx component should be responsible for determining what pages
 * to reveal to a given user.
 */

export const App = () => {
  const auth = useSelector((state: any) => state.auth)
  const current_user = useSelector((state: any) => state.users.user_current)

  console.log(auth, current_user)

  let page = <IonPage></IonPage>
  if (!auth.signed_in) {
    page = <SignInPage></SignInPage>
  } else if (auth.signed_in && !current_user.hasOwnProperty('id')) {
    page = <CreateAccountPage></CreateAccountPage>
    // set page to new user page
  } else if (auth.signed_in && current_user !== {}) {
    page = <TabPage></TabPage>
  } else { 
    page = <IonPage><IonContent><h1>Hello</h1></IonContent></IonPage>
  }

  return page
}

export default App
