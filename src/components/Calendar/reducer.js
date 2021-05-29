import {weekContaining} from "../../utilities/dateUtilities";
import {addDays} from "date-fns";
console.log(weekContaining(new Date()))

export function getWeek(date, increment=0){
    const currentDate = addDays(date,increment*7)
    const days = weekContaining(currentDate)
    const firstDay = days[0]//TODO
    const lastDay = days[days.length-1]//TODO
    return {
        currentDate,days,firstDay,lastDay
    }
}

export function getDay(date,increment=0){
    const currentDate = addDays(date,increment*1)
    const days = [new Date(currentDate)]
    const firstDay = new Date(days[0])
    const lastDay = new Date(days[days.length-1])
    return {
        currentDate,days,firstDay,lastDay
    }
}

export function reducer(state,action){
    const {type} = action
    if(type==='INCREMENT'){
        console.log('type')
        return getWeek(state.currentDate,1)
    }
    else if(type==='DECREMENT'){
        return getWeek(state.currentDate,-1)
    }
}

console.log(getDay(new Date()))
