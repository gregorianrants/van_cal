
import styled from "styled-components";
import NewJobModal from './forms/NewJobModal'
import {addDays} from "date-fns";


import DayLabels from './DayLabels'
import Week from './Week'
import HourTicks from "./HourTicks";

import Header from './Header'
import settingsContext from "./Contexts";

import {fetchWeekContaining} from "../Model/Jobs";

import React from "react";
import  {previousMonday,fitsInWeek} from "../utilities/dateUtilities.js"




const CalendarStyled = styled.div`
  margin: 30px;
  display: grid;
  grid-template-rows: 60px 60px ${props => String(props.hourHeight*24)+'px'};
  grid-template-columns: 60px 1fr;
  
`

export default function Calendar(){
    const [firstDayOfWeek,setFirstDayOfWeek]=React.useState(previousMonday(new Date()))
    const [showModal,setShowModal]=React.useState(false)
    const [displayEvent,setDisplayEvent]=React.useState(null)
    const [events,setEvents]=React.useState([])
    //TODO have a think about what you are using/nameing current day. what does that mean

    const {hourHeight}=React.useContext(settingsContext)

    const updateDisplayEvent=(id)=>{
        setDisplayEvent(events.filter(event=>event.id===id)[0])
    }

    if(displayEvent){
        console.log(displayEvent)
    }

    React.useEffect(()=>{
        fetchWeekContaining(firstDayOfWeek)
            .then(data=> {
                setEvents(data)
            })
            .catch(console.error)
    },[firstDayOfWeek])

    const incrementWeek =()=>{
        setFirstDayOfWeek(day=>addDays(day,7))
    }

    const decrementWeek=()=>{
        setFirstDayOfWeek(day=>addDays(day,-7))
    }

    const toggleModal=()=>{
        setShowModal(val=>!val)
    }

    const addToEvents = (event)=>{
        if (fitsInWeek(firstDayOfWeek,event.start)){
            setEvents(events=>[...events, event])
        }
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
                <Week events={events} firstDayOfWeek={firstDayOfWeek} updateDisplayEvent={updateDisplayEvent}/>
            </CalendarStyled>
           {showModal && <NewJobModal addToEvents={addToEvents} toggleModal={toggleModal}/>}
        </React.Fragment>
    )
}