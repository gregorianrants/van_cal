import styled from "styled-components";

import DayLabels from "./DayLabels";
import HourTicks from "./HourTicks";

import Header from "./Header";
import settingsContext from "./Contexts";

import React from "react";

import { incrementWeekThunk, decrementWeekThunk } from "./calendarSlice";
import { useDispatch, useSelector } from "react-redux";

import {calendarSelectors} from "./calendarSlice";
import Events from "./Events";
import Hours from "./Hours";
import {useGetJobsQuery} from "../api/apiSlice";

const CalendarStyled = styled.div`
 margin: 5px;
`;

const Corner = styled.div`
flex: 0 0 60px;
`

const Row = styled.div`
  display: flex;
  &:nth-child(2){
    flex: 1 0 0;
  }
`

const WeekStyled = styled.div`
  display: flex;
  height: ${props =>`${props.hourHeight*24}px`};
  flex: 1 0 0;
`



const DayStyled = styled.div`
  position: relative;
  //TODO had a bit of problem here i getting borders line up
  //with those from Header ithink its todo with the way flex distributes 
  //extra space need to look into math of grow and shrink
  border-left: 1px solid var(--border-color-light);
  flex: 1 0 0;
  
  &:last-child{
    border-right: 1px solid var(--border-color-light);
  }
`

const ScrollPortal = styled.div`
  width: 100%;
  overflow: scroll;
  margin: 0;
  padding: 0;
  height: 80vh;
  &::-webkit-scrollbar {
    display: none;
  }
 
`

export default function Calendar() {
  const dispatch = useDispatch();

  const { hourHeight } = React.useContext(settingsContext);



  const incrementWeek = () => {
    dispatch(incrementWeekThunk);
  };

  const decrementWeek = () => {
    dispatch(decrementWeekThunk);
  };

  const currentDate = useSelector(calendarSelectors.currentDate);
  const days = useSelector(calendarSelectors.days);

  return (
    <React.Fragment>
      <CalendarStyled hourHeight={hourHeight}>
        <Row>
          <Corner className='corner'/>
          <Header
              currentDate={currentDate}
              incrementWeek={incrementWeek}
              decrementWeek={decrementWeek}
          />
        </Row>
        <Row>
          <Corner />
          <DayLabels days={days} />
        </Row>
        <ScrollPortal>
          <Row>
            <HourTicks />
            <WeekStyled hourHeight={hourHeight}>
              {days.map((date,i) => (
                  <DayStyled key={i}>
                    <Events
                        date={date}
                    />
                    <Hours date={date}/>
                  </DayStyled>
              ))}
            </WeekStyled>
          </Row>
        </ScrollPortal>

      </CalendarStyled>
    </React.Fragment>
  );
}
