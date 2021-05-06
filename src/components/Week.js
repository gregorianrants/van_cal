import Day from './Day'
import styled from "styled-components";
import HourTicks from "./HourTicks";
import React from "react";
import dateUtils from "../utilities/dateUtilities";

const WeekStyled = styled.div`
display: flex;
  

`
const Header=styled.div`
height: 80px;
  text-align: center;
  display: flex;
  
  .spacer{
    width: 30px//todo pass this value down as a prop
  }
  
  .content{
    
    flex: 1 0 auto;
    display: flex;
    border: 1px solid lightgray;
    border-bottom: none;
    
    
    .day-header{
      flex: 1 0 100px;
      :not(:last-child){
        border-right: 1px solid lightgray;
      }
    }
    
  }
`

function currentDayOfWeek(){
    //returns day of week indexed from 0 for monday
    const sundayInitial = new Date().getDay()
    const mondayInital = sundayInitial===0 ? 6 : sundayInitial-1
    return mondayInital
}

function currentDayOfMonth(){
    return new Date().getDate()
}

function getDayOfMonth(forDay){
    //console.log(day)
    //console.log(new Date().getDate())
    console.log(new Date().getDay())
    return currentDayOfMonth() - currentDayOfWeek() + forDay
}

export default function Week(){
    const [currentDay,setCurrentDay]=React.useState(dateUtils.currentDateTime)

    const [week,setWeek]=React.useState(dateUtils.weekContaining(currentDay))





    return(
        <div>
            <Header>
                <div className='spacer'>

                </div>
                <div className='content'>
                    {week
                        .map(date=>(
                          <div className='day-header'>{dateUtils.dayOfWeek(date)}</div>
                        ))}
                </div>
            </Header>
            <WeekStyled>
                <HourTicks/>
                {[...Array(7).keys()]
                    .map(key=><Day/>)}
            </WeekStyled>
        </div>




    )
}