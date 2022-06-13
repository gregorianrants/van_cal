import React from "react";


import styled from 'styled-components'
import EventHeading from "./EventHeading";
import {useHistory} from "react-router-dom";



const StyledEvent = styled.div`
  position: absolute;
  background-color: blue;
  border: 0.5px solid white;
  cursor: ${(props) => (props.overEdge ? "row-resize" : "default")};
  padding: 0.25rem;
`;



export default function GcalEvent({
                                  top: topProp,
                                  bottom: bottomProp,
                                  left,
                                  right,
                                  _id,
                                  start,
                                  end,
                                  updateEvent,
                                  updateDisplayEvent,
                                      summary,
                                      attendees
                              }) {

    const [top, setTop] = React.useState(topProp)
    const [bottom, setBottom] = React.useState(bottomProp)
    //const {hourHeight} = React.useContext(settingsContext)

    const operatives = attendees.filter(attendee=>!(attendee.organizer===true))

    console.log(operatives)

    let history = useHistory()

    React.useEffect(()=>{
        setTop(topProp)
        setBottom(bottomProp)
    },[topProp,bottomProp])

    function handleCLick(){
        history.push(`/calendar/gcal-details/${_id}`)
    }

    return (
        <StyledEvent data-component={'event'}
                     data-id={_id}
                     className='event'

                     style={{
                         top: top+'px', bottom: bottom+'px', left, right
                     }}
                     onClick={handleCLick}
        >
            <EventHeading start={start} end={end} summary={summary} attendees={operatives}/>
        </StyledEvent>
    )
}
