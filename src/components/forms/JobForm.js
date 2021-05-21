import React from "react";

import {TextField, Grid, Button} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    DatePicker,
    TimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

function useInput(defaultValue='') {
    const [value, setValue] = React.useState(defaultValue)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    return {value, onChange}
}


function dateTimeFromInput(date, time) {
    const hours = time.getHours()
    const minutes = time.getMinutes()
    let res = new Date(date)
    res.setHours(hours)
    res.setMinutes(minutes)
    return res
}



export default function JobForm({onSave,addToEvents,toggleModal}){
    const summary = useInput()
    const location = useInput()
    const [dateValue,setDateValue] = React.useState(new Date())
    const [startValue,setStartValue] = React.useState(new Date())
    const [endValue,setEndValue] = React.useState(new Date())
    const description = useInput()


    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            summary: summary.value,
            location: location.value,
            start: dateTimeFromInput(dateValue, startValue),
            end: dateTimeFromInput(dateValue, endValue),
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
            <form action="">
                <Grid container direction='column' spacing={1}>
                    <Grid item>
                        <TextField label='summary' {...summary} fullWidth/>
                    </Grid>
                    <Grid item>
                        <TextField label='location' {...location} fullWidth/>
                    </Grid>
                    <Grid item>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                value={dateValue}
                                onChange={setDateValue}
                                label='date'/>
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <TimePicker
                                value={startValue}
                                onChange={setStartValue}
                                label='start'/>
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <TimePicker
                                value={endValue}
                                onChange={setEndValue}
                                label='end'/>
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item>
                        <TextField label='description' {...description} fullWidth/>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleSubmit} variant='contained' color='primary' fullWidth>save</Button>
                    </Grid>

                </Grid>





            </form>
        </>
        )
}