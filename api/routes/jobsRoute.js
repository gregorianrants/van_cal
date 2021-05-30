const express = require('express')
const router = express.Router()
const jobsController = require('./../controllers/jobsController')


router
    .get('/', jobsController.getJobs)
    .get('/:id',jobsController.getJob)
    .post('/', jobsController.createJob)
    .delete('/:id',jobsController.deleteJob)
    .put('/:id',jobsController.editJob)



module.exports = router
