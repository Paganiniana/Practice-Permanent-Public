import React from 'react'
import { connect } from 'react-redux'
import store from '../../redux/store'
import { updateCurrentUser, updateStudentData } from '../../redux/user.store'

import { UserDataType } from '../../firestore/users'

type PreferredPracticeTimeState = {
    practice_time: number,
}

type PreferredPracticeTimeProps = {
    passed_user: UserDataType, 
    current_user: UserDataType,
    disabled: boolean 
}

// expects a user object in props, updates that user object when the value changes
class PreferredPracticeTimeClass extends React.Component<PreferredPracticeTimeProps, PreferredPracticeTimeState> {

    constructor(props: any) {
        super(props)

        this.state = {
            practice_time: this.props.passed_user.preferred_practice_duration,
        }

        // bind functions 
        this.updatePracticeTime = this.updatePracticeTime.bind(this)
        this.changeListener = this.changeListener.bind(this)
    }

    updatePracticeTime(num: number) {
        let updated_user = {... this.props.passed_user}
        updated_user.preferred_practice_duration = num
        // updateOtherUserData(updated_user)
        // invoke redux store's action handler for updating the user, use current user
        // this is conditional on whether the selected user IS the current user
        if (this.props.current_user.id === this.props.passed_user.id) {
            store.dispatch(updateCurrentUser(updated_user))
        } else {
            // only teachers should get to update other users, so that is the only use case
            store.dispatch(updateStudentData(updated_user))
        }
    }

    changeListener(e: any) {
        let new_practice_time = Number(e.target.value)
        this.setState({
            practice_time: new_practice_time, // convert event value string to number
        })
        this.updatePracticeTime(new_practice_time)
    }

    render() {
        return <div className="input-container">
            <label htmlFor="practice-time-select">Practice Session Length { this.props.disabled ? '(Cannot Change)' : ''}</label>
            <div className="nes-select">
                <select disabled={this.props.disabled} onChange={this.changeListener} value={this.state.practice_time} id="practice=time-select">
                    <option value="15">0:15</option>
                    <option value="25">0:20</option>
                    <option value="30">0:30</option>
                    <option value="45">0:45</option>
                    <option value="60">1:00</option>
                    <option value="75">1:15</option>
                    <option value="90">1:30</option>
                </select>
            </div>
        </div>
    }
}

// this should allow PreferredPracticeTimeClass to use the redux store for things like the current_user

function mapStateToProps(state: any, ownProps: {user_data: UserDataType, disabled: boolean}) {
    let current_user = state.users.user_current

    return {
        passed_user: ownProps.user_data,
        current_user: current_user,
        disabled: ownProps.disabled
    }
}

export const PreferredPracticeTime = connect(mapStateToProps)(PreferredPracticeTimeClass)
