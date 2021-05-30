require('dotenv').config()

console.log(process.env.DB_PASSWORD)
require('./model/db')
let Job = require('./model/job')
let fs = require('fs/promises')

fs.readFile('./api/jobs.json')
    .then(data=>JSON.parse(data))
    .then(data=>{
        Job.resetData(data)
            .catch(err=>{console.log(err)})
    })


