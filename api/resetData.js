require('dotenv').config()

console.log(process.env.DB_PASSWORD)
require('./model/db')
let Job = require('./model/job')
let fs = require('fs/promises')

const {addDays} =require("date-fns");


const jobs =    [
    {
        "summary": "Alan",
        "location": "G20 6RD",
        "start": new Date().setHours(10),
        "end": new Date().setHours(13),
        "description": "moving a wardrobe"
    },
        {
            "summary": "bob",
            "location": "G20 6RD",
            "start": new Date().setHours(12),
            "end": new Date().setHours(14),
            "description": "moving a chair",
        },
        {
            "summary": "alan",
            "location": "G20 6RD",
            "start": new Date().setHours(14),
            "end": new Date().setHours(16),
            "description": "moving a table"
        },
        {
            "summary": "alan",
            "location": "G20 6RD",
            "start": addDays(new Date().setHours(14),1),
            "end":  addDays(new Date().setHours(16),1),
            "description": "moving a table"
        }
    ]

/*
fs.readFile('./api/jobs.json')
    .then(data=>JSON.parse(data))
    .then(data=>{
        Job.resetData(data)
            .catch(err=>{console.log(err)})
    })
*/

Job.resetData(jobs)
    .catch(err=>{console.log(err)})


