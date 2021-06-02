import React from "react";
import {addToPixels} from "../utilities/utilities";
import useDrag from "./useDrag";
import styled from 'styled-components'
import {editJob} from "../Model/Jobs";

import {fromTop,fromBottom,roundToNearest} from "../utilities/utilities";
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

    const initialTop = React.useRef(0)


    function startTime(top) {
        return getTimeFromPosition(top, hourHeight * 24)
    }

    function endTime(bottom) {
        return getTimeFromPosition(hourHeight * 24 - bottom, hourHeight * 24)
    }

    const onDragStart=()=>{
        initialTop.current = top
    }

    const onDrag = (translationY) => {
        const tracked = initialTop.current+translationY
        const snappedTop = roundToNearest(tracked,hourHeight)
        setTop(snappedTop)
        const bottom = fromBottom(snappedTop+eventHeight.current,hourHeight*24)
        setBottom(bottom)
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

