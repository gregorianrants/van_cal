import Day from './Day'
import styled from "styled-components";

import React from "react";
import dateUtils from "dateUtilities";
import {add} from 'date-fns'

import DayLabels from './DayLabels'
import Week from './Week'
import HourTicks from "./HourTicks";

import Header from './Header'
import settingsContext from "./Contexts";

import fetchWeekContaining from "../Model/Jobs";

const CalendarStyled = styled.div`
  margin: 30px;
  display: grid;
  grid-template-rows: 60px 60px ${props => String(props.hourHeight*24)+'px'};
  grid-template-columns: 60px 1fr;
  
`

export default function Calendar(){
    const [currentDay,setCurrentDay]=React.useState(dateUtils.currentDateTime)
    //TODO have a think about what you are using/nameing current day. what does that mean

    const {borderWidth,hourHeight}=React.useContext(settingsContext)


    const week=React.useMemo(
        ()=>{
            return dateUtils.weekContaining(currentDay)
        },
        [currentDay]
        )

    React.useEffect(()=>{
       fetchWeekContaining()
           .then(console.log)
           .catch(console.error)

    },[])

    const incrementWeek =()=>{
        setCurrentDay(day=>dateUtils.addDays(day,7))
    }

    const decrementWeek=()=>{
        setCurrentDay(day=>dateUtils.addDays(day,-7))
    }


    return(
        <CalendarStyled hourHeight={hourHeight}>
            <div></div>
            <Header currentDay={currentDay}
                    incrementWeek={incrementWeek}
            decrementWeek={decrementWeek}/>
            <div></div>
            <DayLabels week={week} />
            <HourTicks/>
            <Week />
        </CalendarStyled>




    )
}