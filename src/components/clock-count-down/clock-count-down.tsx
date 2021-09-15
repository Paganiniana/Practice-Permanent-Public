import React from 'react'
import './clock-count-down.css'

// converts time (in seconds) to a formatted clock time
export class ClockCountDown extends React.Component<{time: number}, {}> {
    getTime() {
        if (this.props.time === 0) {
            // avoid a 'devide by 0' error
            return '00:00'
        }
        let seconds = this.props.time % 60
        let minutes
        if (this.props.time - seconds === 0) {
            minutes = 0
        } else {
            minutes = (this.props.time - seconds) / 60
        }

        // formatted minutes
        let formatted_minutes
        if (minutes < 10) {
            formatted_minutes = `0${minutes}`
        } else {
            formatted_minutes = `${minutes}`
        }

        // formatted seconds
        let formatted_seconds
        if (seconds < 10) {
            formatted_seconds = `0${seconds}`
        } else {
            formatted_seconds = `${seconds}`
        }

        return `${formatted_minutes}:${formatted_seconds}`
    }

    render() {
        return <div className="clock-count-down">{this.getTime()}</div>
    }
}