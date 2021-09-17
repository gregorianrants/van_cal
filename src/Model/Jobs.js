

export async function fetchDays(from,to){
    return fetch(`http://localhost:8000/api/v1/jobs?from=${from}&to=${to}`)
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
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(job)
    }).then(res=>res.json())
        .then(res=>res.data)
        .then(data=> {
            console.log(data)
            return (
                {
                    ...data,
                    start: new Date(data.start),
                    end: new Date(data.end),//TODO create a function that does this
                }
            )
        })
        .catch(err=>console.error(err))
}


export function editJob({_id,data}){
    console.log('editJob')
    console.log(_id)
    console.log(data)

    return fetch(`http://localhost:8000/api/v1/jobs/${_id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res=>res.json())
        .then(res=>res.data)
        .then(data=>(
            {
                ...data,
                start: new Date(data.start),
                end: new Date(data.end),//TODO create a function that does this
            }
        ))
        .catch(err=>console.error(err))
}


