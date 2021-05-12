import React from "react";
import styled from "styled-components";
import {createJob} from "../../Model/Jobs";

function useInput() {
    const [value, setValue] = React.useState('')

    const onChange = (e) => {
        setValue(e.target.value)
    }

    return {value, onChange}
}

const FormStyled = styled.form`
  & .input-set {
    margin: 0;
    padding: 0.5em;
    display: flex;

    input {
      margin-left: auto;
    }
    
  }
  .description {
    flex-direction: column;
  }
`

function dateTimeFromInput(date, time) {
    console.log(time)
    const [hours, minutes] = time.split(':')
    let res = new Date(date)
    res.setHours(hours)
    res.setMinutes(minutes)
    return res
}



export default function JobForm({onSave,addToEvents,toggleModal}){
    const summary = useInput()
    const location = useInput()
    const date = useInput()
    const start = useInput()
    const end = useInput()
    const description = useInput()


    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            summary: summary.value,
            location: location.value,
            start: dateTimeFromInput(date.value, start.value),
            end: dateTimeFromInput(date.value, end.value),
            description: description.value,
        }
        onSave(data)
            .then((calEvent)=>{
                console.log(calEvent)
                addToEvents(calEvent)
                toggleModal()
            })
            .catch(console.error)
    }


    return (
        <>
            <h2>Create Job</h2>
            <FormStyled action="">
                <div className='input-set'>
                    <label htmlFor="summary">summary</label>
                    <input type="text" name='summary' {...summary}/>
                </div>

                <div className='input-set'>
                    <label htmlFor="location">location</label>
                    <input type="text" name='summary' {...location}/>
                </div>


                <div className='input-set'>
                    <label htmlFor="date">date</label>
                    <input type="date" name='date' {...date}/>
                </div>


                <div className='input-set'>
                    <label htmlFor="start">start time</label>
                    <input type="time" name='start' {...start}/>
                </div>

                <div className='input-set'>
                    <label htmlFor="end">end time</label>
                    <input type="time" name='end' {...end}/>
                </div>

                <div className='input-set description'>
                    <label htmlFor="description">description</label>
                    <textarea type="text" name='description' {...description}/>
                </div>
                <button onClick={handleSubmit}>save</button>
            </FormStyled>
        </>
        )
}