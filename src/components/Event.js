import React from "react";
import {addToPixels} from "../utilities/utilities";
import useDrag from "./useDrag";
import styled from 'styled-components'
import {editJob} from "../Model/Jobs";

import {getNumPixels,fromTop} from "../utilities/utilities";
import settingsContext from "./Contexts";
import {setHours, setMinutes} from "date-fns";
import {getTimeFromPosition} from '../utilities/timeConversions.js'
import {mergeDateAndTime} from '../utilities/dateUtilities'
import useDetectBottomEdge from "./useDetectBottomEdge";


const StyledEvent = styled.div`
  position: absolute;
  background-color: ${props => props.backgroundColor};
  border: 0.5px solid white;
  cursor: ${props => props.overEdge ? 'row-resize' : 'default'};
`
/*`border: 0.5px solid white;
border-top: 0.5px solid transparent;
border-bottom: 0.5px solid transparent;`*/


/*export default function Event({
                                  top: initialTop,
                                  bottom: initialBottom,
                                  left,
                                  right,
                                  _id,
                                  start,
                                  end,
                                  backgroundColor = 'red',
                                  updateEvent,
                                  updateDisplayEvent
                              }) {

    const [top, setTop] = React.useState(initialTop)
    const [bottom, setBottom] = React.useState(initialBottom)
    const {hourHeight} = React.useContext(settingsContext)
    const eventHeight = fromTop(initialBottom,24*hourHeight)-initialTop


    function startTime(top) {
        return getTimeFromPosition(top, hourHeight * 24)
    }

    function endTime(bottom) {
        return getTimeFromPosition(hourHeight * 24 - bottom, hourHeight * 24)
    }

    const onMouseMove = (movementY,translationY,initialTop,height) => {
        const position = initialTop+translationY
        const remainder = position%hourHeight
        const upper = position-remainder
        const lower = upper+hourHeight
        if(Math.abs(position-upper)<Math.abs(position-lower)){
            setTop(upper)
            setBottom(((hourHeight*24) -(upper+height)))
        }
        else{
            setTop(lower)
            setBottom(hourHeight*24 - (lower+height))
        }
    }

    const onMouseUp = (totalTranslationY) => {
        console.log(totalTranslationY)
        if(totalTranslationY!=0){//TODO do i want to allow a little bit of movement then set back to original value if movement is small
            editJob({
                _id, data:
                    {
                        start: mergeDateAndTime(start, startTime(top)),
                        end: mergeDateAndTime(end, endTime(bottom))
                    }
            })
                .then(data=>{updateEvent(data._id,data)})
                .catch(console.error)
        }
        else{
            console.log('heloooooo')
            updateDisplayEvent(_id)
        }
    }

    const onMouseDown = useDrag(onMouseMove, onMouseUp)


    return (
        <StyledEvent data-component={'event'}
                     data-id={_id}
                     className='event'
                     onMouseDown={()=>{onMouseDown(top,eventHeight)}}


                     backgroundColor={backgroundColor}
                     style={{
                         /!*backgroundColor: backgroundColor,*!/
                         /!* zIndex: zIndex,*!/
                         top: top+'px', bottom: bottom+'px', left, right
                     }}
        >
        </StyledEvent>
    )
}*/

export default function Event({
                                  top: topProp,
                                  bottom: bottomProp,
                                  left,
                                  right,
                                  _id,
                                  start,
                                  end,
                                  backgroundColor = 'red',
                                  updateEvent,
                                  updateDisplayEvent
                              }) {

    const [top, setTop] = React.useState(topProp)
    const [bottom, setBottom] = React.useState(bottomProp)
    const {hourHeight} = React.useContext(settingsContext)
    const eventHeight = React.useRef(fromTop(bottomProp,24*hourHeight)-topProp)
    console.log(eventHeight)

    const initial = React.useRef(0)


    function startTime(top) {
        return getTimeFromPosition(top, hourHeight * 24)
    }

    function endTime(bottom) {
        return getTimeFromPosition(hourHeight * 24 - bottom, hourHeight * 24)
    }

    const onDragStart=()=>{
        initial.current = top
        console.log(initial.current)
    }

    const onDrag = (translationY) => {
        const tracked = initial.current+translationY
        const remainder = tracked%hourHeight
        const upper = tracked-remainder
        const lower = upper+hourHeight
        if(Math.abs(tracked-upper)<Math.abs(tracked-lower)){
            setTop(upper)
            setBottom(((hourHeight*24) -(upper+eventHeight.current)))
        }
        else{
            setTop(lower)
            setBottom((hourHeight*24) - (lower+eventHeight.current))
        }
    }

    const onDragEnd = (totalTranslationY) => {
        console.log(totalTranslationY)
        if(totalTranslationY!=0){//TODO do i want to allow a little bit of movement then set back to original value if movement is small
            editJob({
                _id, data:
                    {
                        start: mergeDateAndTime(start, startTime(top)),
                        end: mergeDateAndTime(end, endTime(bottom))
                    }
            })
                .then(data=>{updateEvent(data._id,data)})
                .catch(console.error)
        }
        else{
            console.log('heloooooo')
            updateDisplayEvent(_id)
        }
    }

    const drag = useDrag(onDragStart,onDrag, onDragEnd)
    const {overEdge,handleMouseMove,handleMouseLeave} = useDetectBottomEdge()



    return (
        <StyledEvent data-component={'event'}
                     data-id={_id}
                     className='event'
                     onMouseDown={(e)=>{drag(e)}}
                     onMouseMove={handleMouseMove}
                     onMouseLeave={handleMouseLeave}
                     overEdge={overEdge}
                     draggable='false'


                     backgroundColor={backgroundColor}
                     style={{
                         /*backgroundColor: backgroundColor,*/
                         /* zIndex: zIndex,*/
                         top: top+'px', bottom: bottom+'px', left, right
                     }}
        >
        </StyledEvent>
    )
}

