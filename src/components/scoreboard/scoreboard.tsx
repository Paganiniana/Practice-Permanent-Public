import React, { useEffect }  from 'react'
import './scoreboard.css'
import { useSelector } from 'react-redux'

import { getTopPracticers } from '../../firestore/scoreboard'
import { PixelLoader } from '../pixel-loading-animation/pixel-loading-animation'

type ScoreboardProps = {
    limit: number
}

export const Scoreboard = (props: ScoreboardProps) => {

    let practicers = useSelector((state: any) => state.scoreboard.top_by_hours)
    // let filtered_practicers = practicers
    let filtered_practicers = practicers.slice().sort((a: any, b: any) => {
        return b.minutes - a.minutes
    })
    // populate the scoreboard slice, default 10
    useEffect(() => {getTopPracticers(props.limit)}, [])

    let list
        if (practicers.length === 0) {
            list = <tr>
                <td>
                <PixelLoader />
            </td>
            </tr>
        } else {
            list = filtered_practicers.map((p: any) => {
                let index = filtered_practicers.indexOf(p) + 1
                return <tr key={index}>
                    <td className="scoreboard-user">
                        <span className="scoreboard-index">
                            {index}
                        </span>
                        <div className="avatar">
                            <img src={p.photo_url} alt="User" className="nes-avatar"/>
                        </div>
                        <h3>{p.name}</h3>
                        <div className="practice-time">
                            <strong>{p.minutes}</strong> Minutes Practiced
                        </div>
                    </td>
                </tr>
            })
        }
        return <div className="nes-table-responsive scoreboard-container">
            <table className="nes-table is-bordered is-centered">
                <thead>
                    <tr>
                        <th>
                            <h2>Leaderboard</h2>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </table>
        </div>
}


// export class ScoreboardOld extends React.Component<ScoreboardProps, ScoreboardState> {

//     constructor(props: any) {
//         super(props)
//         this.state = {
//             practicers: []
//         }
//     }

//     componentDidMount() {
//         // get the top n practicers
//         this.getPracticers()
//     }

//     getPracticers() {
//         getTopPracticers(this.props.limit).then((data: Array<any>) => {
//             this.setState({
//                 practicers: data,
//             })
//         })
//     }

//     render() {
//         let list
//         if (this.state.practicers.length === 0) {
//             list = <tr>
//                 <td>
//                 <PixelLoader />
//             </td>
//             </tr>
//         } else {
//             list = this.state.practicers.map((p: any) => {
//                 return <tr>
//                     <td className="scoreboard-user">
//                         <span className="scoreboard-index">
//                             {this.state.practicers.indexOf(p) + 1}
//                         </span>
//                         <div className="avatar">
//                             <img src={p.photo_url} alt="User" className="nes-avatar"/>
//                         </div>
//                         <h3>{p.name}</h3>
//                         <div className="practice-time">
//                             <strong>{p.minutes}</strong> Minutes Practiced
//                         </div>
//                     </td>
//                 </tr>
//             })
//         }
//         return <div className="nes-table-responsive scoreboard-container">
//             <table className="nes-table is-bordered is-centered">
//                 <thead>
//                     <tr>
//                         <th>
//                             <h2>Leaderboard</h2>
//                         </th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {list}
//                 </tbody>
//             </table>
//         </div>
//     }
// }