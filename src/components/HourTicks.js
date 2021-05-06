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
  width: 15px;
 
  &:first-child{
    border-top: ${props=>`${props.border}px solid transparent`};
  }
  border-bottom: ${props=>`${props.border}px solid transparent`};
  
  p {
    color: grey;
    margin: 0;
    padding: 0;
    font-size: 12px;
    transform: translateY(-6px);//TODO this is just a value i tried that seems to work NOW need to look a the math though so it works for all settings
  }
`;







function TickValues(){
    const {borderWidth,hourHeight}=React.useContext(settingsContext)

    return(
        <div>
            {[...Array(24).keys()]//TODO something weird happens when i set this to 25?
                .map((index) =>
                    <TickValuesStyled
                        key={index}
                        height={hourHeight}
                        border={borderWidth}
                    ><p>{index}</p></TickValuesStyled>
                )}
        </div>
    )

}

export default function HourTicks({headerHeight}){
    const {borderWidth,hourHeight}=React.useContext(settingsContext)

    return (

        <HourTicksStyled headerHeight={headerHeight}>
            <TickValues/>
            <TicksStyled height={hourHeight} border={borderWidth}/>
        </HourTicksStyled>
    )
}

