import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './assignment-adder.css'
import store from '../../redux/store'
import { addAssignment } from '../../redux/assignment.store'
import { nanoid } from '@reduxjs/toolkit'

type AssignmentAdderProps = {
    assignee_id: string
}


export const AssignmentAdder = (props: AssignmentAdderProps) =>{

    let current_user = useSelector((state: any) => state.users.user_current)

    let [category, setCategory] = useState('')
    let [description, setDescription] = useState('')
    let [name, setName] = useState('')

    // form functions
    function handleCategory(e: any) {
        setCategory(e.target.value)
    }

    function handleDescription(e: any) {
        setDescription(e.target.value)
    }

    function handleName(e: any) {
        setName(e.target.value)
    }

    // save
    function saveAssignment() {
        let id = nanoid()
        store.dispatch(addAssignment({
            id: id,
            assigned_by_id: current_user.id,
            assigned_to_id: props.assignee_id,
            category: category,
            current: true,
            description: description,
            name: name
        }))
        // clear inputs
        setCategory('')
        setDescription('')
        setName('')
    }

    return (
        <div className="nes-container is-rounded assignment-adder-container">
            <h1>Add Assignment</h1>

                <div className="nes_field">
                    <label htmlFor="name_field">Name</label>
                    <input value={name}
                    onChange={handleName} type="text" id="name_field" className="nes-input"/>
                </div>
                <div className="nes_field">
                    <label htmlFor="category_field">Category</label>
                    <input value={category}
                    onChange={handleCategory} type="text" id="name_field" className="nes-input"/>
                </div>
                <div className="nes_field">
                    <label htmlFor="text_area">Description</label>
                    <textarea onChange={handleDescription} value={description} id="text_area" className="nes-textarea"></textarea>
                </div>  
                <button type="button" className="nes-btn is-success"
                    color="success"
                    onClick={saveAssignment}>Add</button>            
        </div>
    )

}