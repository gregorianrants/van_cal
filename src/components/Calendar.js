import Day from './Day'
import styled from "styled-components";
import NewJobModal from './forms/NewJobModal'

import React from "react";
import dateUtils from "../utilities/dateUtilities";
import {add} from 'date-fns'

import DayLabels from './DayLabels'
import Week from './Week'
import HourTicks from "./HourTicks";

import Header from './Header'
import settingsContext from "./Contexts";

import {fetchWeekContaining} from "../Model/Jobs";

const CalendarStyled = styled.div`
  margin: 30px;
  display: grid;
  grid-template-rows: 60px 60px ${props => String(props.hourHeight*24)+'px'};
  grid-template-columns: 60px 1fr;
  
`

export default function Calendar(){
    const [firstDayOfWeek,setFirstDayOfWeek]=React.useState(dateUtils.previousMonday(new Date()))
    const [showModal,setShowModal]=React.useState(false)

    const [events,setEvents]=React.useState([])
    //TODO have a think about what you are using/nameing current day. what does that mean

    const {borderWidth,hourHeight}=React.useContext(settingsContext)

    React.useEffect(()=>{
        fetchWeekContaining(firstDayOfWeek)
            .then(data=> {
                setEvents(data)
            })
            .catch(console.error)
    },[firstDayOfWeek])

    const incrementWeek =()=>{
        setFirstDayOfWeek(day=>dateUtils.addDays(day,7))
    }

    const decrementWeek=()=>{
        setFirstDayOfWeek(day=>dateUtils.addDays(day,-7))
    }

    const toggleModal=()=>{
        setShowModal(val=>!val)
    }


    return(
        <React.Fragment>
            <CalendarStyled hourHeight={hourHeight}>
                <div></div>
                <Header firstDayOfWeek={firstDayOfWeek}
                        incrementWeek={incrementWeek}
                        decrementWeek={decrementWeek}
                        handleShowModal={toggleModal}
                />
                <div></div>
                <DayLabels firstDayOfWeek={firstDayOfWeek} />
                <HourTicks/>
                <Week events={events} firstDayOfWeek={firstDayOfWeek}/>
            </CalendarStyled>
           {showModal && <NewJobModal />}
        </React.Fragment>

    )
}