import Day from './Day'
import styled from "styled-components";

const WeekStyled = styled.div`
display: flex;
  margin: 30px;

`


export default function Week(){
    return(
        <WeekStyled>
            {[...Array(7).keys()]
                .map(key=><Day />)}
        </WeekStyled>

    )
}