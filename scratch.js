const du = require('../dateUtilities/dateUtilities')

const time = '17:47'


const [hours,minutes] = time.split(':')


function dateTimeFromInput(date,time){
    const [hours,minutes] = time.split(':')
    let res = new Date(date)
    res.setHours(hours)
    res.setMinutes(minutes)
    return res
}

const res = dateTimeFromInput('2021-05-13','16:53')

console.log(res)



