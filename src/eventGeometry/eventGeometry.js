import groupEvents from './groupEvents'


const heightOfHour = () => 100 / 24

const top = (start) => start * heightOfHour()

const bottom = (end) => end * heightOfHour()

const numCols=(cols)=>cols.length

const widthOfCol = (cols) => 100 / numCols(cols)

const left = (colIndex,cols) => colIndex * widthOfCol(cols)



function eventGeometry(event,colIndex,cols) {
    //the nudge is a bit of a hack to make look better without it event divs overlap
    //top and bottom margins of hour div
    //TODO change implementation so that it defines top and bottom postion as an offest
    //from the hour div they are in, i will do this by taking into account the height of hour
    //div and the border widths e.g 9.15 am is a 25% offset from 930am so it would be
    //centre postion minus 1/4 height of hour div (- border width if using border box). i will find the cetnre postion
    // using
    //a calculation that takes into account the hour div height
    const nudgeTop = 0.25
    const nudgeBottom = 0.25
    const {start, end} = event
    return {
        ...event,
        top: String(top(start) +nudgeTop) + '%',
        bottom: String(100 - bottom(end) +nudgeBottom) + '%',
        left: String(left(colIndex,cols)) + '%',
        right: String(100 - (left(colIndex,cols) + widthOfCol(cols))) + '%'
    }
}

function flatDeep(arr, d = 1) {
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
        : arr.slice();
};

export function eventsGeometry(events) {
    let result =  groupEvents(events).map(
        overlappingGroup => overlappingGroup
            .map((col, colIndex) => {
                return col.map((event, eventIndex) => (
                    eventGeometry(event,colIndex,overlappingGroup)
                ))
            })
    )
    return flatDeep(result,Infinity)
}
