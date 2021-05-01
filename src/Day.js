import React from 'react'
import {configure}
    from './eventGeometry/eventGeometry'
import {timePeriod} from "./eventGeometry/groupEvents";


function getNumPixels(str){
    return str.slice(0,str.length-2)*1
}

function addToPixels(withPx,num){
    return (getNumPixels(withPx)*1 + num)+'px'
}


function eventReducer(state,action){
    const {top,bottom,mouseDown}=state
    const {type,movementY}=action
    if(type==='mouseDown'){
        return{
            ...state,
            mouseDown: true,
            zIndex: 1000,
        }
    }
    else if(type==='mouseMove'){
        return {
            ...state,
            top: addToPixels(top,movementY),
            bottom: addToPixels(bottom, -movementY)
        }
    }
    else if(type==='mouseUp'){
        return {
            ...state,
            mouseDown: false
        }
    }
}

const getTime=(position,height)=>{
    return (position/height)*24
}


function Event({top: initialTop, bottom: initialBottom, left, right,updateEvent}) {
    const [state,dispatch] = React.useReducer(eventReducer,{
        bottom: initialBottom,
        top: initialTop,
        mouseDown: false,
        zIndex: 100
    })


    const handleMouseDown=(e)=>{
        dispatch({type: 'mouseDown'})
    }

    const handleMouseMove=(e)=>{
        if(state.mouseDown){
            dispatch({type: 'mouseMove',movementY: e.movementY})
        }
    }

    const handleMouseUp=(e)=>{
        if(state.mouseDown){
            dispatch({type: 'mouseUp'})
            updateEvent(top,bottom)
        }
    }



    const {top,bottom,zIndex} = state
    return (
        <div className='event'
            style={{
                backgroundColor: 'red',
                zIndex: zIndex,
                top,bottom,left,right
            }}
             onMouseDown={handleMouseDown}
             onMouseMove={handleMouseMove}
             onMouseUp={handleMouseUp}
        >
        </div>
    )
}

function Events({events,height,border,updateEvent}){
    const eventsGeometry = configure(height,border)

    const updateEventWithIdF = (id)=>(
        (top,bottom)=>{
            let start = getTime(getNumPixels(top),20*24)
            let end = getTime(20*24 - getNumPixels(bottom),20*24)
            updateEvent(id,{start,end})
        }
    )

    return(
        eventsGeometry(events)
            .map(
                (evnt,i)=><Event
                    {...evnt}
                    key={evnt.id}
                    updateEvent={updateEventWithIdF(evnt.id)}
                    height={height}
                />
            )

    )
}

function Hours({height,border}) {
    return (
        [...Array(24).keys()]
            .map((index) => <div className='hour'
                                 key={index}
                                 data-hour={String(index)}
            style={{
                height: `${height}px`,
                borderTop: index===0 ? `${border}px solid grey` : `0`,
                borderBottom: `${border}px solid grey`,
            }}
            />)
    )
}


export default function Day() {
    const [events,setEvents]=React.useState([
        timePeriod(10, 14),
        timePeriod(10, 12),
        timePeriod(12.25, 13.75),
        timePeriod(15, 17.25),
        timePeriod(15, 17),
        timePeriod(18, 20)
    ])

    const [startHour,setStartHour] = React.useState(null);

    const handleMouseDown=(e)=>{
        setStartHour(e.target.dataset.hour * 1)
    }

    const handleMouseUp=(e)=>{
        const end = e.target.dataset.hour * 1
        if(startHour <end){
            setEvents(events=>[...events,timePeriod(startHour,end)])
        }

    }

    const height=20
    const border=0.2

    const updateEvent=(id,{start,end})=>{
        setEvents(events=>events.map(event=>{
            if (event.id===id){
                return timePeriod(start,end)
            }
            else{
                return {...event}
            }
        }))
    }






    return (
        <div className='day'
             onMouseDown={handleMouseDown}
             onMouseUp={handleMouseUp}
        >

            <Events events={events} height={height} border={border} updateEvent={updateEvent}/>
            <Hours height={height} border={border}/>
        </div>

    )
}
