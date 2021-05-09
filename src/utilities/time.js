function round(value,places){
    return Math.floor(value * 10**places)/10**places
}

export default function asDecimal(dateTime){
    const hours = dateTime.getHours()
    const fractionOfHour = dateTime.getMinutes()/60

    return round(hours+fractionOfHour,2)
}


