import Event from './Event'
import {getTime,getNumPixels} from "../utilities/utilities";


import {configure} from "../eventGeometry/eventGeometry";
import React from "react";

export default function Events({events, height, border, updateEvent}) {
    const eventsGeometry = configure(height, border)

    const updateEventWithIdF = (id) => (
        (top, bottom) => {
            let start = getTime(getNumPixels(top), 20 * 24)
            let end = getTime(20 * 24 - getNumPixels(bottom), 20 * 24)
            updateEvent(id, {start, end})
        }
    )

    return (
        eventsGeometry(events)
            .map(
                (evnt, i) => <Event
                    {...evnt}
                    key={evnt.id}
                    updateEvent={updateEventWithIdF(evnt.id)}
                    height={height}
                />
            )

    )
}
