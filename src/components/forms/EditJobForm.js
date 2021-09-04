import React from "react";
import {editJob} from "../../Model/Jobs";
import JobForm from './JobForm'











export default function EditJobForm({updateEvent,close,toggleModal,initialValues}) {
    const handleSubmit = (_id,data) => {
        console.log(data)
        editJob({_id: _id, data:data})
            .then((calEvent)=>{
                console.log(calEvent)
                updateEvent(_id,calEvent)
                close()
            })
            .catch(console.error)
    }

    return (

                    <JobForm handleSubmit={(editedData)=>{
                        return handleSubmit(initialValues._id,editedData)
                    }}
                             toggleModal={toggleModal}
                             initialValues={initialValues}
                    />

    )
}