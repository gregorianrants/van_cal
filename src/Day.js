import React from 'react'
import {eventsGeometry}
    from './eventGeometry/eventGeometry'
import {TimePeriod} from "./eventGeometry/groupEvents";










function Event({top: topInitial, bottom, left, right}) {
    const [top,setTop] = React.useState(topInitial)
    const [mouseDown,setMouseDown] = React.useState(false)
    const topPos = React.useRef(null)
    return (
        <div className='event'
            style={{
                backgroundColor: 'red',
                zIndex: 100,
                top,bottom,left,right
            }}


             onMouseDown={(e)=>{
                 const el = e.target
                 topPos.current = el.getBoundingClientRect().top
                 setTop(el.getBoundingClientRect().top)
                 setMouseDown(true)

             }}

             onMouseMove={(e)=>{
                 if(mouseDown){

                     /*console.log(`top ${top}`)
                     console.log(`moevement ${e.movementY}`)
                     setTop(top=>top+e.movementY)*/
                 }

             }}
        >

        </div>
    )
}

function Events({events}){
    console.log(eventsGeometry(events))
    return(
        eventsGeometry(events)
            .map((evnt,i)=><Event {...evnt} key={evnt.id}/>)

    )
}

function Hours() {
    return (
        [...Array(24).keys()]
            .map((index) => <div className='hour' key={index} data-hour={String(index)}></div>)
    )
}

export default function Day() {
    const [events,setEvents]=React.useState([
        new TimePeriod(10, 14),
        new TimePeriod(10, 12),
        new TimePeriod(12.25, 13.75),
        new TimePeriod(15, 17.25),
        new TimePeriod(15, 17),
        new TimePeriod(18, 20)
    ])

    const [startHour,setStartHour] = React.useState(null);

    const handleMouseDown=(e)=>{
        setStartHour(e.target.dataset.hour * 1)
    }

    const handleMouseUp=(e)=>{
        const end = e.target.dataset.hour * 1
        setEvents(events=>[...events,new TimePeriod(startHour,end)])
    }

    const updateEvent=(id,{start,end})=>{
        setEvents(events=>events.map(event=>{
            if (event.id===id){
                return {...event,start,end}
            }
        }))
    }






    return (
        <div className='day' onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>

            <Events events={events}/>
            <Hours />
        </div>

    )
}
