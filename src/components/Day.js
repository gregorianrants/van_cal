import React from 'react'
import {configure}
    from '../eventGeometry/eventGeometry'
import {timePeriod} from "../eventGeometry/groupEvents";
import Events from './Events'
import Hours from "./Hours";
import styled from 'styled-components'
import settingsContext from "./Contexts";

const DayStyled = styled.div`
  position: relative;
  flex: 1 0 100px;
  border-left: 0.1px solid var(--border-color-light);
  border-right: 0.1px solid var(--border-color-light);
`



export default function Day() {
    const {borderWidth,hourHeight}=React.useContext(settingsContext)

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
        <DayStyled>

                    <Events events={events} updateEvent={updateEvent}/>
                    <Hours/>
        </DayStyled>
    )
}


