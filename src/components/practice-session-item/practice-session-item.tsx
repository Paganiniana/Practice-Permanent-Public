import React from 'react'
import { useSelector } from 'react-redux'
import './practice-session-item.css'
import { AssignmentType } from '../../firestore/assignments'
import { PixelLoader } from '../pixel-loading-animation/pixel-loading-animation'

type ItemProps = {
    assignment_id: string,
}

type ItemState = {
    assignment: AssignmentType | null,
}

export const PracticeSessionItem = (props: ItemProps) => {

    let current_assignment = useSelector((state: any) => state.assignments.find((s: any) => s.id === props.assignment_id))

    if (current_assignment) {
        return <div className="nes-container is-rounded practice-session-item">
            <h1>{current_assignment.name}</h1>
            <p>{current_assignment.description}</p>
        </div>
    } else {
        return <div className="nes-container is-rounded practice-session-item">
            <h1>Loading Assignment...</h1>
            <PixelLoader></PixelLoader>
            </div>
    }
}