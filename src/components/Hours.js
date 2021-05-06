import React from "react";
import styled from "styled-components";
import settingsContext from './Contexts'


const HourStyled = styled.div` 
    height:  ${props=> `${props.height}px`};
    border-top: 1px solid lightgray;
  
  &:last-child{
    border-bottom: ${props=>`${props.border}px solid var(--border-color-light)`}
  }
   
    
`


export default function Hours({className}) {
    const {borderWidth,hourHeight}=React.useContext(settingsContext)


    return (
        <div>
            {[...Array(24).keys()]
                .map((index) =>
                        <HourStyled
                            key={index}
                            data-hour={String(index)}
                            height={hourHeight}
                            border={borderWidth}
                            className={className}
                        />
                )}
        </div>

    )
}