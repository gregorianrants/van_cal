const {addDays,add,format,nextMonday,isSameDay} = require("date-fns");

function mondayIndexed(sundayIndexed) {
    return sundayIndexed === 0 ? 6 : sundayIndexed - 1
}

function weekIndex(date) {
    return mondayIndexed(date.getDay())
}

/*
function currentDateTime() {
    return add(new Date(), {minutes: new Date().getTimezoneOffset() * -1})
}
*/

function weekContaining(date) {
    const daysOfWeek = [0, 1, 2, 3, 4, 5, 6]
    const difference = daysOfWeek.map(day => day - weekIndex(date))
    return difference.map(diff => addDays(date, diff))
}

function dayOfWeek(date){
    return format(date,'iii')
}

function monthAndYear(date){
    return `${format(date,'MMM')} ${format(date,'yyyy')}`
}

function previousMonday(date){
    const result =nextMonday(addDays(date,-7))
    result.setHours(0)
    result.setMinutes(0)
    return result
}

const fitsInWeek=(firstDayOfWeek,date)=>{
    const endOfWeek = addDays(firstDayOfWeek,7)
    if (isSameDay(firstDayOfWeek,date) || isSameDay(endOfWeek,date)){
        return true
    }
    return (date >=firstDayOfWeek && date <=endOfWeek)
}

module.exports = {
    weekContaining,
    dayOfWeek,
    monthAndYear,
    addDays,
    previousMonday,
    fitsInWeek
}