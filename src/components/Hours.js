import React from "react";

export default function Hours({height, border}) {
    return (
        [...Array(24).keys()]
            .map((index) => <div className='hour'
                                 key={index}
                                 data-hour={String(index)}
                                 style={{
                                     height: `${height}px`,
                                     borderTop: index === 0 ? `${border}px solid grey` : `0`,
                                     borderBottom: `${border}px solid grey`,
                                 }}
            />)
    )
}