import dateUtils from "../utilities/dateUtilities";
import styled from "styled-components";


const HeaderStyled=styled.div`
height: 80px;
  text-align: center;
  display: flex;
  
  .spacer{
    width: 30px//todo pass this value down as a prop
  }
  
  .content{
    flex: 1 0 auto;
    display: flex;
    border-top: 1px solid lightgray;
    
    .day-header{
      flex: 1 0 auto;
      border-left: 1px solid var(--border-color-light);

      &:last-child{
        border-right: 1px solid var(--border-color-light);
      }
    }
  }
`

export default function Header({week}){
    return (
        <HeaderStyled>
            <div className='spacer'>
            </div>
            <div className='content'>
                {week
                    .map(date=>(
                        <div className='day-header'>{dateUtils.dayOfWeek(date)}</div>
                    ))}
            </div>
        </HeaderStyled>
    )
}