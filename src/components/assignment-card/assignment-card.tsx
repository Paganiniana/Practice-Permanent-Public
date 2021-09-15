import React from 'react'
import { motion } from 'framer-motion'

import './assignment-card.css'

import store from '../../redux/store'
import { removeAssignment } from '../../redux/assignment.store'

type AssignmentCardProps = {
    assignment: {
        id: string,
        name: string,
        assigned_to_id: string,
        assigned_by_id: string,
        category: string,
        description: string,
        current: boolean,
    }
}

export const AssignmentCard = (props: AssignmentCardProps) => {

    function deleteThisAssignment() {
        store.dispatch(removeAssignment(props.assignment))
    }

    return (<motion.div layout className="nes-container is-rounded assignment-card ">
            <motion.div layout>
                <motion.h1>{props.assignment.name}</motion.h1>
            </motion.div>
            <motion.div layout>
                <motion.p>{props.assignment.description}</motion.p>
                <motion.span>{props.assignment.category}</motion.span>
                <motion.br></motion.br>
                <motion.button className="nes-btn is-warning" onClick={deleteThisAssignment}>Remove</motion.button>
            </motion.div>
        </motion.div>)
}


// export class AssignmentCardOld extends React.Component <AssignmentCardProps, {}> {
//     constructor(props: any) {
//         super(props);
//         this.deleteThisAssignment = this.deleteThisAssignment.bind(this);
//     }

//     deleteThisAssignment() {
//         deleteAssignment(this.props.assignment);
//     }

//     render() {
//         return (<motion.div layout className="nes-container is-rounded assignment-card ">
//             <motion.div layout>
//                 <motion.h1>{this.props.assignment.name}</motion.h1>
//             </motion.div>
//             <motion.div layout>
//                 <motion.p>{this.props.assignment.description}</motion.p>
//                 <motion.span>{this.props.assignment.category}</motion.span>
//                 <motion.br></motion.br>
//                 <motion.button className="nes-btn is-warning" onClick={this.deleteThisAssignment}>Remove</motion.button>
//             </motion.div>
//         </motion.div>)
//         // return <h1>{this.props.assignment.name}</h1>
//     }
// }