import du from '../utilities/dateUtilities'


const port = 3000

export async function fetchWeekContaining(weekStart){
    const weekEnd = du.addDays(weekStart,7)


    return fetch(`http://localhost:8000/api/v1/jobs?from=${weekStart}&to=${weekEnd}`)
        .then(res=>res.json())
        .then(res=>res.data)
        .then(data=>data.map(job=>(
            {...job,
                start: new Date(job.start),
                end: new Date(job.end),//TODO create a function that does this
            }
        )))
        .catch(err=>console.error(err))
}


export function createJob(job){
    return fetch(`http://localhost:8000/api/v1/jobs`,{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //mode: 'cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        //redirect: 'follow', // manual, *follow, error
        //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(job) // body data type must match "Content-Type" header
    }).then(res=>res.json())
        .catch(err=>console.error(err))
}

