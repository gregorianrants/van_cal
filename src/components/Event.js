import React from "react";
import {addToPixels, getNumPixels, getTime} from "../utilities/utilities";
import useDrag from "./useDrag";



export default function Event({top: initialTop,
                                  bottom: initialBottom,
                                  left,
                                  right, id,
                                  backgroundColor = 'red',
                                  updateEvent,
                                    height
                              }) {

    const [top,setTop]= React.useState(initialTop)
    const [bottom,setBottom] = React.useState(initialBottom)
    let topRef = React.useRef(initialTop)
    let bottomRef = React.useRef(initialBottom)

    const onMouseMove=(movementY)=>{
        setTop(top =>addToPixels(top, movementY))
        setBottom(bottom => addToPixels(bottom, - movementY))
    }

    const onMouseUp=(totalTranslationY)=>{
       updateEvent(addToPixels(initialTop,totalTranslationY),
           addToPixels(initialBottom,-totalTranslationY))
    }

    const onMouseDown = useDrag(onMouseMove,onMouseUp)

    return (
        <div data-component={'event'}
             data-id={id}
             className='event'
             onMouseDown={onMouseDown}
             style={{
                 backgroundColor: backgroundColor,
                 /* zIndex: zIndex,*/
                 top, bottom, left, right
             }}
        >
        </div>
    )
}

