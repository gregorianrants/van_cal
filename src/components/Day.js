import React from 'react'
import {configure}
    from '../eventGeometry/eventGeometry'
import {timePeriod} from "../eventGeometry/groupEvents";
import Events from './Events'
import Hours from "./Hours";



export default function Day() {
    const [events, setEvents] = React.useState([
        timePeriod(10, 14),
        timePeriod(10, 12),
        timePeriod(12.25, 13.75),
        timePeriod(15, 17.25),
        timePeriod(15, 17),
        timePeriod(18, 20)
    ])
   /*const [state,dispatch] = React.useReducer(reducer,{
       mouseDown: false,
       position: null,
       top: null,
       bottom: null,
       left: null,
       right: null
   })*/


    const height = 20
    const border = 0.2

    const updateEvent = (id, {start, end}) => {
        setEvents(events => events.map(event => {
            if (event.id === id) {
                return timePeriod(start, end)
            } else {
                return {...event}
            }
        }))
    }


    return (
        <div className='day'>
            <Events events={events} height={height} border={border} updateEvent={updateEvent}/>
            <Hours height={height} border={border}/>
        </div>
    )
}
