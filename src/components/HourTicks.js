import Hours from "./Hours";
import settingsContext from './Contexts'
import React from "react";
import styled from "styled-components";


const HourTicksStyled = styled.div`
display: flex;

`
const TicksStyled = styled(Hours)`
  width: 15px;
`;

const TickValuesStyled = styled.div`
  height:  ${props=> `${props.height}px`};
 
  &:first-child{
    border-top: ${props=>`${props.border}px solid transparent`};
  }
  border-bottom: ${props=>`${props.border}px solid transparent`}


`

function TickValues(){
    const {borderWidth,hourHeight}=React.useContext(settingsContext)

    return(
        <div>
            {[...Array(24).keys()]
                .map((index) =>
                    <TickValuesStyled
                        key={index}
                        height={hourHeight}
                        border={borderWidth}
                    >1</TickValuesStyled>
                )}
        </div>
    )

}

export default function HourTicks(){
    const {borderWidth,hourHeight}=React.useContext(settingsContext)

    return (
        <HourTicksStyled>
            <TickValues/>
            <TicksStyled height={hourHeight} border={borderWidth}/>
        </HourTicksStyled>
    )
}

