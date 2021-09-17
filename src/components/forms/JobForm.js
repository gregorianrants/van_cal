import React, {useReducer} from "react";
import {useInput} from '../hooks/useInput'
import {useArray} from '../hooks/useArray'



import {AddressInput} from "./AddressInput";

import {TextField, Grid, Button} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    DatePicker,
    TimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';


import {Typography} from "@material-ui/core";





function dateTimeFromInput(date, time) {
    const hours = time.getHours()
    const minutes = time.getMinutes()
    let res = new Date(date)
    res.setHours(hours)
    res.setMinutes(minutes)
    return res
}



export default function JobForm({handleSubmit,toggleModal,initialValues}){
    const name = useInput(initialValues?.customer?.name)
    const mobile = useInput(initialValues?.customer?.mobile)
    const [dateValue,setDateValue] = React.useState(initialValues?.start || new Date())
    const [startValue,setStartValue] = React.useState(initialValues?.start || new Date())
    const [endValue,setEndValue] = React.useState(initialValues?.end || new Date())
    const addresses = useArray(initialValues?.addresses)

    function data(){
        return {
            start: dateTimeFromInput(dateValue, startValue),
                end: dateTimeFromInput(dateValue, endValue),
            customer: {
            name: name.value,
                mobile: mobile.value,
        },
            charges: {
                hourlyRate: 50,
                    fuelCharge: 5,
                    travelTime: 20,
            },
            operatives: ['gregor','rupert'],
            items: ['this','that','the next thing'],
            addresses: addresses.value.map(el=>el.value),
        }
    }

    /*const [addressesState,addressesUi] = AddressInput(initialValues?.addresses || [])*/
    /*const [addressesUi] = AddressInput(initialValues?.addresses || [])*/

    return (
        <>
            <Typography variant='h4'>Create Job</Typography>
            <form action="">
                <Grid container direction='column' spacing={1}>
                    <fieldset name='customer'>
                        <Grid item>
                            <TextField label='name' {...name} fullWidth/>
                        </Grid>
                        <Grid item>
                            <TextField label='mobile' {...mobile} fullWidth/>
                        </Grid>
                    </fieldset>
                </Grid>
                <Grid container>
                    <Grid item>
                        <Grid container spacing={2}>
                            <Grid item xs={4} >
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        value={dateValue}
                                        onChange={setDateValue}
                                        label='date'/>
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={4} >
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <TimePicker
                                        value={startValue}
                                        onChange={setStartValue}
                                        label='start'/>
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={4} >
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <TimePicker
                                        value={endValue}
                                        onChange={setEndValue}
                                        label='end'/>
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid>
                        <AddressInput addresses={addresses}/>
                    </Grid>
                   {/* <Grid>
                        <Grid container>
                            <Grid item xs={4}>
                                <TextField label='hourly rate' {...name} fullWidth/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField label='fuel charge' {...mobile} fullWidth/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField label='travel time' {...name} fullWidth/>
                            </Grid>
                        </Grid>

                    </Grid>*/}
                    <Grid>
                        <Button onClick={
                            (e)=>{e.preventDefault()
                                console.log(data())
                                handleSubmit(data())
                            }
                        } variant='contained' color='primary' fullWidth>save</Button>
                    </Grid>
                </Grid>
            </form>
        </>
        )
}