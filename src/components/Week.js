
import Day from "./Day";
import styled from "styled-components";
import du from '../utilities/dateUtilities.js'



const WeekStyled = styled.div`
display: flex;
  
`

export default function Week({events,firstDayOfWeek,updateDisplayEvent}){
    return(
        //TODO: consider efficiency of filterning all events each time for each day, should i be using a map object instead
        <WeekStyled>
            {du.weekContaining(firstDayOfWeek).map((date,i) => (
                <Day
                    events={events.filter(event => event.start.getDay() === date.getDay())}
                    key={i}
                    updateDisplayEvent={updateDisplayEvent}/>
            ))}
        </WeekStyled>
    )
}

