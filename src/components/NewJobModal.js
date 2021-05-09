import styled from "styled-components";

const NewJobModalStyled = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(1,1,1,0.2);
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  div{
    background-color: white;
    
  }
  
`



export default function NewJobModal(){
    return(
        <NewJobModalStyled>
            <div>
                <h1>Some Text</h1>
            </div>
        </NewJobModalStyled>
    )
}