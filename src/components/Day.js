import React from 'react'
import {configure}
    from '../eventGeometry/eventGeometry'
import {timePeriod} from "../eventGeometry/groupEvents";
import Events from './Events'
import Hours from "./Hours";
import Event from './Event'
import {addToPixels} from "../utilities/utilities";



function reducer(state,action){
    const {type, payload} = action
    if(type==='mousedownEvent'){
        const {top,bottom,left,right}=payload
        return{
            ...state,
            mouseDown: 'event',
            top: top,
            bottom: bottom,
            left: left,
            right: right,
        }
    }
    else if(type==='mouseMove'){
        const {movementY} = payload
        const {top,bottom} = state
        return{
            ...state,
            top: addToPixels(top, movementY),
            bottom: addToPixels(bottom, -movementY)
        }
    }
    else if(type==='mouseUp'){
        return{
            ...state,
            mouseDown: false
        }
    }
}



export default function Day() {
    const [events, setEvents] = React.useState([
        timePeriod(10, 14),
        timePeriod(10, 12),
        timePeriod(12.25, 13.75),
        timePeriod(15, 17.25),
        timePeriod(15, 17),
        timePeriod(18, 20)
    ])
   const [state,dispatch] = React.useReducer(reducer,{
       mouseDown: false,
       position: null,
       top: null,
       bottom: null,
       left: null,
       right: null
   })



   const handleMouseDown = (e) => {
       const {component,id} = e.target.dataset
       const {top,bottom,left,right} = e.target.style
       let calEvent = events.filter(event=>event.id===id*1)
       setEvents(events=>events.filter(event=>event.id!==id*1))
       dispatch({type: 'mousedownEvent', payload: {top,bottom,left,right}})
    }

    const handleMouseMove = (e) =>{
        if(state.mouseDown){
            dispatch({type: 'mouseMove' ,payload: {movementY: e.movementY}})
        }
    }

    const handleMouseUp = (e) =>{
        dispatch({type: 'mouseUp'})
    }





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






    const {top,bottom,left,right} = state

    return (
        <div className='day'
             onMouseDown={handleMouseDown}
             onMouseMove={handleMouseMove}
             onMouseUp={handleMouseUp}

        >
            {top ? <Event {...state} backgroundColor={'blue'}/> : ''}
            <Events events={events} height={height} border={border} updateEvent={updateEvent}/>
            <Hours height={height} border={border}/>
        </div>

    )
}
