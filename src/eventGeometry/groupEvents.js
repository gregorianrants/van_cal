function idGenerator() {
    let id = 0
    return () => id++
}

let id = idGenerator()

export function timePeriod(start, end) {
    return {
        startTimeDecimal: start,
        endTimeDecimal: end,
        id: id()}
}

/*let events = [
    new TimePeriod(10, 13.5),
    new TimePeriod(10.5, 11.5),
    new TimePeriod(13, 14),
    new TimePeriod(16, 17),
    new TimePeriod(15.5, 16.5),
    new TimePeriod(21,23)
]*/



/*let groups = events.map(event => [event])*/

function getStart(set) {
    return set.map(event => event.startTimeDecimal).reduce((a, b) => Math.min(a, b))
}

function getEnd(set) {
    return set.map(event => event.endTimeDecimal).reduce((a, b) => Math.max(a, b))
}

function asPeriod(set) {
    return timePeriod(getStart(set), getEnd(set))
}

function overlaps(period1, period2) {
    return period1.startTimeDecimal < period2.endTimeDecimal && period2.startTimeDecimal < period1.endTimeDecimal
}

function negate(f){
    return (...args)=>{
        return !f(...args)
    }
}


/*
function sortAscending(arr) {
    return [...arr].sort((a, b) => a - b)
}
*/

function sortAscending(arr) {
    return [...arr].sort((a, b) => a.startTimeDecimal - b.startTimeDecimal)
}


function difference(arrayA, arrayB) {
    let ids = arrayA.map(event => event.id)
    return arrayB.filter(event => !ids.includes(event.id))
}


function extractSet(periods, condition) {
    return (
        sortAscending(periods)
            .reduce(
                (set, period) => set.length === 0 || condition(period, asPeriod(set)) ? [...set, period] : set
                , [])
    )
}

function extractSetWith(condition){
    return (periods)=>{
        return extractSet(periods,condition)
    }
}

function buildSets(periods, extractionF, sets = []) {
    if (periods.length === 0) return sets
    let set = extractionF(periods)
    return buildSets(
        difference(set, periods),
        extractionF,
        [...sets, set])
}

function buildSetsWith(extractionF){
    return (periods)=>{
        return buildSets(periods,extractionF,[])
    }
}



export default function groupEvents(events){

    let overlappingSets = buildSetsWith(extractSetWith(overlaps))(events)

    let withColumns = overlappingSets.map(set=>{
        return buildSetsWith(extractSetWith(negate(overlaps)))(set)
    })
    return withColumns
}



//console.log(overlappingSets)

/*
console.log(JSON.stringify(withColumns,null, 2))*/
