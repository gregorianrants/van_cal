import styled from "styled-components";
import React from "react";
import {createJob} from "../Model/Jobs";

const BackGround = styled.div`

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(1, 1, 1, 0.2);
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Modal = styled.div`
  background-color: white;
  padding: 1.5em;

`


const Form = styled.form`


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


function useInput() {
    const [value, setValue] = React.useState('')

    const onChange = (e) => {
        setValue(e.target.value)
    }

    return {value, onChange}
}


export default function NewJobModal() {
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
        createJob(data).then(console.log).catch(console.error)
    }


    return (
        <BackGround>
            <Modal>
                <h2>Create Job</h2>
                <Form action="">
                    <div class='input-set'>
                        <label htmlFor="summary">summary</label>
                        <input type="text" name='summary' {...summary}/>
                    </div>

                    <div className='input-set'>
                        <label htmlFor="location">location</label>
                        <input type="text" name='summary' {...location}/>
                    </div>


                    <div class='input-set'>
                        <label htmlFor="date">date</label>
                        <input type="date" name='date' {...date}/>
                    </div>


                    <div class='input-set'>
                        <label htmlFor="start">start time</label>
                        <input type="time" name='start' {...start}/>
                    </div>

                    <div class='input-set'>
                        <label htmlFor="end">end time</label>
                        <input type="time" name='end' {...end}/>
                    </div>

                    <div class='input-set description'>
                        <label htmlFor="description">description</label>
                        <textarea type="text" name='description' {...description}/>
                    </div>
                    <button onClick={handleSubmit}>save</button>
                </Form>
            </Modal>
        </BackGround>
    )
}