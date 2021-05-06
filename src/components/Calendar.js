import Day from './Day'
import styled from "styled-components";

import React from "react";
import dateUtils from "dateUtilities";
import {add} from 'date-fns'

import DayLabels from './DayLabels'
import Week from './Week'
import HourTicks from "./HourTicks";

import Header from './Header'

const CalendarStyled = styled.div`
  margin: 30px;
  display: grid;
  grid-template-rows: 60px 60px 720px;
  grid-template-columns: 60px 900px;
`

export default function Calendar(){
    const [currentDay,setCurrentDay]=React.useState(dateUtils.currentDateTime)
    //TODO have a think about what you are using/nameing current day. what does that mean


    const week=React.useMemo(
        ()=>{
            return dateUtils.weekContaining(currentDay)
        },
        [currentDay]
        )



    const incrementWeek =()=>{
        setCurrentDay(day=>dateUtils.addDays(day,7))
    }

    const decrementWeek=()=>{
        setCurrentDay(day=>dateUtils.addDays(day,-7))
    }


    return(
        <CalendarStyled>
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