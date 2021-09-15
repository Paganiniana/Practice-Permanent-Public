import React from 'react'
import { connect } from 'react-redux'
import store from '../../redux/store'
import { updateCurrentUser, updateStudentData } from '../../redux/user.store'

import { UserDataType } from '../../firestore/users'

type PreferredPracticeChunkState = {
    chunk_time: number,
}

type PreferredPracticeTimeProps = {
    passed_user: UserDataType, 
    current_user: UserDataType,
    disabled: boolean 
}

// expects a user object in props, updates that user object when the value changes
export class PreferredPracticeChunkClass extends React.Component<PreferredPracticeTimeProps, PreferredPracticeChunkState> {

    constructor(props: any) {
        super(props)

        this.state = {
            chunk_time: this.props.passed_user.preferred_practice_chunk,
        }

        // bind functions 
        this.updatePracticeChunk = this.updatePracticeChunk.bind(this)
        this.changeListener = this.changeListener.bind(this)
    }

    updatePracticeChunk(num: number) {
        let updated_user = {... this.props.passed_user}
        updated_user.preferred_practice_chunk = num
        // emit the change event to redux
        if (this.props.current_user.id === this.props.passed_user.id) {
            // update current user
            store.dispatch(updateCurrentUser(updated_user))
        } else {
            // update student
            store.dispatch(updateStudentData(updated_user))
        }   
    }

    changeListener(e: any) {
        let new_practice_chunk = Number(e.target.value)
        this.setState({
            chunk_time: new_practice_chunk, // convert event value string to number
        })
        this.updatePracticeChunk(new_practice_chunk)
    }

    render() {
        return <div className="input-container">
            <label htmlFor="practice-chunk-select">Practice Item Timer { this.props.disabled ? '(Cannot Change)' : ''}</label>
            <div className="nes-select">
                <select disabled={this.props.disabled} onChange={this.changeListener} value={this.state.chunk_time} id="practice=time-select">
                    <option value="2">2 Minutes</option>
                    <option value="3">3 Minutes</option>
                    <option value="4">4 Minutes</option>
                    <option value="5">5 Minutes</option>
                </select>
            </div>
        </div>
    }
 

}

function mapStateToProps(state: any, ownProps: {user_data: UserDataType, disabled: boolean}) {
    let current_user = state.users.user_current

    return {
        passed_user: ownProps.user_data,
        current_user: current_user,
        disabled: ownProps.disabled
    }
}

export const PreferredPracticeChunk = connect(mapStateToProps)(PreferredPracticeChunkClass)
