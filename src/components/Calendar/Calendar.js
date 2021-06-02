
import styled from "styled-components";
import NewJobModal from '../forms/NewJobModal'
import {addDays} from "date-fns";


import DayLabels from '../DayLabels'
import Week from '../Week'
import HourTicks from "../HourTicks";

import Header from '../Header'
import settingsContext from "../Contexts";

import {fetchDays} from "../../Model/Jobs";

import React from "react";
import  {previousMonday,fitsInWeek} from "../../utilities/dateUtilities.js"

import JobDetailsModal from "../forms/JobDetailsModal";

import socketIOClient from "socket.io-client";

import {useDay,useWeek} from "./reducer";

const CalendarStyled = styled.div`
  margin: 30px;
  display: grid;
  grid-template-rows: 60px 60px ${props => String(props.hourHeight*24)+'px'};
  grid-template-columns: 60px 1fr;
`

export default function Calendar(){
    const [daysOnCal,dispatch] = useWeek()



    const [showNewJobModal,setShowNewJobModal]=React.useState(false)
    const [displayEvent,setDisplayEvent]=React.useState(null)
    const [events,setEvents]=React.useState([])
    //TODO have a think about what you are using/nameing current day. what does that mean

    const {hourHeight}=React.useContext(settingsContext)

    const updateDisplayEvent=(id)=>{
        setDisplayEvent(events.filter(event=>event._id===id)[0])
    }

    if(displayEvent){
        console.log(displayEvent)
    }

    React.useEffect(()=>{
        fetchDays(daysOnCal.firstDay,daysOnCal.lastDay)
            .then(data=> {
                setEvents([...data])//TODO have a look at what we are doing here what if there is no data
            })
            .catch(console.error)
    },[daysOnCal])

  /*  React.useEffect(()=>{
        const socket = socketIOClient('http://localhost:8000');
        console.log(socket)

        socket.on('message',(msg)=>{
            fetchWeekContaining(firstDayOfWeek)
                .then(data=> {
                    setEvents(data)
                })
                .catch(console.error)
        })
    },[firstDayOfWeek])*/

    const incrementWeek =()=>{
        dispatch({type: 'INCREMENT'})

    }

    const decrementWeek=()=>{
        dispatch({type: 'DECREMENT'})
    }

    const toggleNewJobModal=()=>{
        setShowNewJobModal(val=>!val)
    }

    const addToEvents = (event)=>{
        console.log(event)
        if (fitsInWeek(daysOnCal.firstDay,event.start)){
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
                <Header currentDate={daysOnCal.currentDate}
                        incrementWeek={incrementWeek}
                        decrementWeek={decrementWeek}
                        handleShowModal={toggleNewJobModal}
                />
                <div></div>
                <DayLabels days={daysOnCal.days} />
                <HourTicks/>
                <Week events={events}
                      days={daysOnCal.days}
                      updateDisplayEvent={updateDisplayEvent}
                      updateEvent={updateEvent}
                />
            </CalendarStyled>
           {showNewJobModal && <NewJobModal addToEvents={addToEvents} toggleModal={toggleNewJobModal}/>}
            {displayEvent && <JobDetailsModal displayEvent={displayEvent}/>}
        </React.Fragment>
    )
}