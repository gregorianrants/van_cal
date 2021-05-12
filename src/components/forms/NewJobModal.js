import styled from "styled-components";
import React from "react";
import {createJob} from "../../Model/Jobs";
import JobForm from './JobForm'
import Modal from './Modal'










export default function NewJobForm({addToEvents,toggleModal}) {
    return (
        <Modal>
            <JobForm onSave={createJob} addToEvents={addToEvents} toggleModal={toggleModal}/>
        </Modal>
    )
}