import Day from './Day'
import styled from "styled-components";

import React from "react";
import dateUtils from "../utilities/dateUtilities";

import Header from './Header'
import Week from './Week'

const CalendarStyled = styled.div`
  margin: 30px;


`

export default function Calendar(){
    const [currentDay,setCurrentDay]=React.useState(dateUtils.currentDateTime)

    const [week,setWeek]=React.useState(dateUtils.weekContaining(currentDay))

    return(
        <CalendarStyled>
            <Header week={week} />
            <Week />
        </CalendarStyled>




    )
}