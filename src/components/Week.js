import HourTicks from "./HourTicks";
import Day from "./Day";
import styled from "styled-components";
import du from '../utilities/dateUtilities'



const WeekStyled = styled.div`
display: flex;
  
`

export default function Week({events,firstDayOfWeek}){
    console.log(events)
    return(
        //TODO: consider efficiency of filterning all events each time for each day, should i be using a map object instead
        <WeekStyled>
            {du.weekContaining(firstDayOfWeek).map(date => (
                <Day events={events.filter(event => event.start.getDay() === date.getDay())} />
            ))}
        </WeekStyled>
    )
}

