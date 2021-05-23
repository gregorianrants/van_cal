
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

import JobDetailsModal from "./forms/JobDetailsModal";

import socketIOClient from "socket.io-client";








const CalendarStyled = styled.div`
  margin: 30px;
  display: grid;
  grid-template-rows: 60px 60px ${props => String(props.hourHeight*24)+'px'};
  grid-template-columns: 60px 1fr;
  
`

export default function Calendar(){
    const [firstDayOfWeek,setFirstDayOfWeek]=React.useState(previousMonday(new Date()))
    const [showNewJobModal,setShowNewJobModal]=React.useState(false)
    const [displayEvent,setDisplayEvent]=React.useState(null)
    const [events,setEvents]=React.useState([])
    const [newDataCount,setNewDataCount] = React.useState(0)
    //TODO have a think about what you are using/nameing current day. what does that mean

    const {hourHeight}=React.useContext(settingsContext)

    const updateDisplayEvent=(id)=>{
        setDisplayEvent(events.filter(event=>event._id===id)[0])
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
    },[firstDayOfWeek,newDataCount])

    React.useEffect(()=>{
        const socket = socketIOClient('http://localhost:8000');
        console.log(socket)

        socket.on('message',(msg)=>{
            setNewDataCount(count=>count+1)
            console.log(msg)
        })
    },[])

    const incrementWeek =()=>{
        setFirstDayOfWeek(day=>addDays(day,7))
    }

    const decrementWeek=()=>{
        setFirstDayOfWeek(day=>addDays(day,-7))
    }

    const toggleNewJobModal=()=>{
        setShowNewJobModal(val=>!val)
    }

    const addToEvents = (event)=>{
        if (fitsInWeek(firstDayOfWeek,event.start)){
            setEvents(events=>[...events, event])
        }
    }

    const updateEvent=(id,data)=>{
        setEvents((events)=>{
            const remainder = events.filter(event=>event._id!==id)
            return [...remainder,data]
        })

    }

    return(
        <React.Fragment>
            <CalendarStyled hourHeight={hourHeight}>
                <div></div>
                <Header firstDayOfWeek={firstDayOfWeek}
                        incrementWeek={incrementWeek}
                        decrementWeek={decrementWeek}
                        handleShowModal={toggleNewJobModal}
                />
                <div></div>
                <DayLabels firstDayOfWeek={firstDayOfWeek} />
                <HourTicks/>
                <Week events={events}
                      firstDayOfWeek={firstDayOfWeek}
                      updateDisplayEvent={updateDisplayEvent}
                      updateEvent={updateEvent}
                />
            </CalendarStyled>
           {showNewJobModal && <NewJobModal addToEvents={addToEvents} toggleModal={toggleNewJobModal}/>}
            {displayEvent && <JobDetailsModal displayEvent={displayEvent}/>}
        </React.Fragment>
    )
}