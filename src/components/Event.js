import React from "react";
import {addToPixels} from "../utilities/utilities";
import useDrag from "./useDrag";
import styled from 'styled-components'
import {editJob} from "../Model/Jobs";

import {getNumPixels} from "../utilities/utilities";
import settingsContext from "./Contexts";
import {setHours, setMinutes} from "date-fns";
import {getTimeFromPosition} from '../utilities/timeConversions.js'
import {mergeDateAndTime} from '../utilities/dateUtilities'


const StyledEvent = styled.div`
  position: absolute;
  background-color: ${props => props.backgroundColor};
  border: 0.5px solid white
`
/*`border: 0.5px solid white;
border-top: 0.5px solid transparent;
border-bottom: 0.5px solid transparent;`*/


export default function Event({
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

    function startTime(top) {
        return getTimeFromPosition(getNumPixels(top), hourHeight * 24)
    }

    function endTime(bottom) {
        return getTimeFromPosition(hourHeight * 24 - getNumPixels(bottom), hourHeight * 24)
    }

    const onMouseMove = (movementY) => {
        setTop(top => addToPixels(top, movementY))
        setBottom(bottom => addToPixels(bottom, -movementY))
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
                     onMouseDown={onMouseDown}


                     backgroundColor={backgroundColor}
                     style={{
                         /*backgroundColor: backgroundColor,*/
                         /* zIndex: zIndex,*/
                         top, bottom, left, right
                     }}
        >
        </StyledEvent>
    )
}

