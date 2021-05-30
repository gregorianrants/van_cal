const Job = require('./../model/job')
const dateUtils = require('../dateUtilities/dateUtilities')//TODO share between api and react app
const {notify} = require('../sockets')



exports.getJobs = async (req, res) => {

    const {monday,sunday} = dateUtils.weekBoundaries(dateUtils.currentDateTime())
    //todo need to set monday to start of day and sunday to end of day

    const {from=monday, to=sunday}=req.query
    console.log(from)
    console.log('----------')
    console.log(to)
    console.log('   ')

    try {
       /* let data = await Job.list({})*/
        let data = await Job.list({from,to})
        console.log(data)

        res.status(200).json({status: 'success', data: data})
    } catch (err) {
        res.status(404)
            .json({
                status: 'failed',
                message: 'unable to find resource'
            })
    }
}

exports.createJob= async (req,res)=>{
    try{
        let job = await Job.create(req.body)
        notify()
        res.status(200)
            .json({
                status:'success',
                data: job});
    }catch(err){
        res.status(500)//Todo is this correct code to use
            .json({status: 'fail',
                message: err})
    }
}

exports.getJob = async (req,res)=>{
    try{
        const job = await Job.get(req.params.id)
        res.status(200)
            .json({status: 'success',
                data: job})

    }catch(err){
        console.log(`there was an error fetching job: ${job}`)
        res.status(404)
            .json({status: 'fail',
            message: err})
    }
}


exports.deleteJob = async (req,res)=>{
    try{
        const id = req.params.id;
        let data = await Job.remove(id)
        res.status(200).json({status: 'success',
        data: data})
    }catch(err){
        console.log(`there was an error deleting the job: ${err}` )
        res.status(400).json({status: 'fail',
        message: 'failed to delete job'})
    }
}

exports.editJob = async (req,res)=>{
    console.log('fuck')
    try{
        const id = req.params.id;
        const data = await Job.edit(id,req.body)
        console.log(req.body)
        res.status(200).json({status: 'success',
            data: data})
    }catch(err){
        console.log(`there was an error editing the job: ${err}` )
        res.status(400).json({status: 'fail',
            message: 'failed to edit job'})
    }
}

