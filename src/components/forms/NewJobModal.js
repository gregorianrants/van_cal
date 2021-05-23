
import React from "react";
import {createJob} from "../../Model/Jobs";
import JobForm from './JobForm'
import Modal from './Modal'
import {Card, CardContent} from "@material-ui/core";










export default function NewJobForm({addToEvents,toggleModal}) {
    return (
        <Modal>
            <Card style={{width: 300}}>
                <CardContent>
                    <JobForm onSave={createJob}
                             addToEvents={addToEvents}
                             toggleModal={toggleModal}/>
                </CardContent>
            </Card>
        </Modal>
    )
}