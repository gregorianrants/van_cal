const port = 3000

export default async function fetchWeekContaining(){
    fetch('http://localhost:8000/jobs')
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(err=>console.error(err))
}

fetchWeekContaining()