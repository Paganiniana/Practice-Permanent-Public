import React from 'react'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { AssignmentCard } from '../assignment-card/assignment-card'
import './assignment-list.css'

type Assignment = {
    id: string,
    name: string,
    assigned_to_id: string,
    assigned_by_id: string,
    category: string,
    description: string,
    current: boolean,
}

type AssignmentListProps = {
    assignments: Array<Assignment>,
}

type AssignmentListState = {
    selected: Assignment | null,
}

export class AssignmentList extends React.Component <AssignmentListProps, AssignmentListState>{
    constructor(props: any) {
        super(props)

        this.state = {
            selected: null,
        }
    }

    render() {

        let list: Array<any> = []
        this.props.assignments.forEach((val: any, i: number) => {
            list.push(<AssignmentCard key={String(i)} assignment={val}></AssignmentCard>)
        })

        return <AnimateSharedLayout type="crossfade">
            <motion.div layout className="assignment-list"> 
            {list}
        </motion.div>
        
        </AnimateSharedLayout>
    }

}