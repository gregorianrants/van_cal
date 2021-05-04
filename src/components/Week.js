import Day from './Day'
import styled from "styled-components";
import HourTicks from "./HourTicks";

const WeekStyled = styled.div`
display: flex;
  margin: 30px;

`


export default function Week(){
    return(

            <WeekStyled>
                <HourTicks/>
                {[...Array(7).keys()]
                    .map(key=><Day />)}
            </WeekStyled>


    )
}