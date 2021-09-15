import React, {createRef} from 'react'
import { IonSlides, IonSlide } from '@ionic/react'

import './practice-session.css'

import { updatePracticeSession, PracticeSessionType } from '../../redux/practice-session.store'

import {PracticeSessionItem} from '../practice-session-item/practice-session-item'
import { ProgressSlide } from '../progress-slide/progress-slide'
import { ClockCountDown } from '../clock-count-down/clock-count-down'
import { BackButton } from '../back-button/back-button' 
import { PixelModal } from '../pixel-modal/pixel-modal'
import store from '../../redux/store'


type PracticeSessionProps = {
    session: PracticeSessionType | null,
    timer_duration: number,
    suspendFunction?: any
}

type PracticeSessionState = {
    current_index: number,
    timer: number,
    timer_started: Date | null,
    show_suspend: boolean,
}


// expects a PracticeSession object in the props and a number (seconds) that the practice timer should run
// possesses methods to update that session as needed
export class PracticeSession extends React.Component<PracticeSessionProps, PracticeSessionState> {

    slideComp: any;
    interval: any;

    constructor(props: any) {
        super(props)

        this.finishCurrentItem = this.finishCurrentItem.bind(this)
        this.getCurrentIndex = this.getCurrentIndex.bind(this)
        this.slideNext = this.slideNext.bind(this)
        this.startItem = this.startItem.bind(this)
        this.confirmSuspend = this.confirmSuspend.bind(this)
        this.cancelSuspend = this.cancelSuspend.bind(this)
        this.suspend = this.suspend.bind(this)

        this.state = {
            current_index: 0,
            timer: 0,
            timer_started: null,
            show_suspend: false,
        }

        this.slideComp = createRef()
    }

    componentDidMount() {
        this.setState({
            current_index: this.getCurrentIndex(),
            timer: this.state.timer,
            timer_started: this.state.timer_started,
            show_suspend: this.state.show_suspend,
        })
    }

    getCurrentIndex() {
        if (this.props.session != null) {
            let index = this.props.session?.items.findIndex((item) => {
                if (item.current) {
                    return true
                }
            })
            if (index === -1) {
                return 0
            } else {
                return index
            }
        } else {
            // FIX
            return -1
        }
    }
    // TODO: fix component so that it doesn't edit its own props
    finishCurrentItem() {
        let temp_session: any = {... this.props.session}
        if (temp_session.hasOwnProperty('items')) {
            if (this.props.session !== null) {
                temp_session.items = this.props.session.items.map((i) => {
                    return {... i}
                })
            }
            if (temp_session.items) {
                let i = this.getCurrentIndex()
            if (i === -1) {
                // handle special case where a "current" item has not been selected
                temp_session.items[0].completed = true
                temp_session.items[0].current = false
                temp_session.items[1].current = true
                this.slideNext()
            } else if (i >= (temp_session.items.length - 1)) {
                temp_session.items[i].completed = true
                temp_session.items[i].current = false
                temp_session.finished = true
                this.finishSession()
            } else {
                // all others
                temp_session.items[i].completed = true
                temp_session.items[i].current = false
                temp_session.items[i + 1].current = true
                this.slideNext()
            }

            // update in redux
            // TODO: move 
            store.dispatch(updatePracticeSession(temp_session))
            
            }
        }
    }
    
    async slideNext() {
        this.setState({
            current_index: this.state.current_index + 1,
            timer: this.state.timer,
            timer_started: this.state.timer_started,
            show_suspend: this.state.show_suspend,
        })
        this.slideComp?.current.slideNext()
        
    }

    async finishSession() {
        console.log('This session is finished.')
    }

    startItem() {
        this.setState({
            current_index: this.state.current_index,
            timer: this.props.timer_duration,
            timer_started: new Date(),
            show_suspend: this.state.show_suspend
        })
            this.interval = setInterval(() => {
                // get the difference between between now and the time the timer started
                let time
                if (this.state.timer_started !== null) {
                    time = this.props.timer_duration - (Math.floor(new Date().getTime() / 1000) - Math.floor(this.state.timer_started?.getTime() / 1000))
                } else {
                    time = this.state.timer - 1
                }

                this.setState({
                    current_index: this.state.current_index,
                    timer: time,
                    timer_started: this.state.timer_started,
                    show_suspend: this.state.show_suspend
                })
                if (this.state.timer <= 0) {
                    this.finishCurrentItem()
                    clearInterval(this.interval)
                }
    
            }, 1000)
    }

    getProgressText() {
        // returns a string of X/X with remaining chunks to complete
        let completed = this.props.session?.items.filter((i: any) => {
            return i.completed
        })
        let completed_text
        if (completed) {
            completed_text = completed.length + 1
        } else {
            completed_text = '0'
        }
        return `${completed_text}/${this.props.session?.items.length}`
    }

    confirmSuspend() {
        // show a modal, passing the suspend function
        this.setState({
            current_index: this.state.current_index,
            timer: this.state.timer,
            timer_started: this.state.timer_started,
            show_suspend: true
        })
    }

    cancelSuspend() {
        this.setState({
            current_index: this.state.current_index,
            timer: this.state.timer,
            timer_started: this.state.timer_started,
            show_suspend: false
        })
    }

    suspend() {
        // suspend the session
        if (this.props.suspendFunction) {
            this.props.suspendFunction()
        } else {
            console.error('This session was not provided with a cancellation function.')
        }
    }

    render() {
        let slide_options = {
            initialSlide: this.state.current_index,
            allowSlideNext: true,
            allowSlidePrev: true,
            allowTouchMove: false,
        }
        let slides = this.props.session?.items.map((item) => {
            return <IonSlide>
                <PracticeSessionItem assignment_id={item.assignment_id}></PracticeSessionItem>
                </IonSlide>
        })

        let progress_slide
        if (this.props.session?.hasOwnProperty('items')) {
            progress_slide = <ProgressSlide current={this.state.current_index + 1} end={this.props.session.items.length}></ProgressSlide>
        }
        let slide_text  = <span className="progress-display">{this.getProgressText()}</span>

        return <div className="practice-session-container">
            <div className="session-controls">
            <BackButton onClick={this.confirmSuspend} />
            {/* Show the user how far into the current session they are */}
            <div className="progress-slide-container">
                {slide_text}
                {progress_slide}
            </div>
            {/* When a timer is active, show the current time (counting down), when it isn't give the option to start the current session. */}
            { (this.state.timer > 0) ?  
            <ClockCountDown time={this.state.timer}></ClockCountDown> : 
            <button onClick={this.startItem} className="nes-btn is-warning">Start</button>
            }
            </div>
            <div className="slide-container">
            <IonSlides ref={this.slideComp} pager={false} options={slide_options}>
                {slides}
            </IonSlides>
            </div>
            {this.state.show_suspend ? <PixelModal confirmFunc={this.suspend} cancelFunc={this.cancelSuspend} modal_title="Stop Practicing?" cancel_text="No! Keep going!" confirm_text="Yes. End it." message_text="You can always resume this practice session later, but we don't want you to lose your momentum."  /> : <div></div>}
        </div>
    }
} 