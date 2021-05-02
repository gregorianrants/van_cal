import React from "react";
import {addToPixels} from "../utilities/utilities";


/*
function eventReducer(state, action) {
    const {top, bottom, mouseDown} = state
    const {type, movementY, id} = action
    if (type === 'mouseDown') {
        return {
            ...state,
            id: id,
            mouseDown: true,
            zIndex: 1000,
        }
    } else if (type === 'mouseMove') {
        return {
            ...state,
            top: addToPixels(top, movementY),
            bottom: addToPixels(bottom, -movementY)
        }
    } else if (type === 'mouseUp') {
        return {
            ...state,
            mouseDown: false
        }
    }
}
*/



export default function Event({
                                 /* top: initialTop,
                   bottom: initialBottom,*/top,bottom,
                   left,
                   right,id,
    backgroundColor='red',
                   updateEvent
               }) {
    /*const [state, dispatch] = React.useReducer(eventReducer, {
        bottom: initialBottom,
        top: initialTop,
        mouseDown: false,
        zIndex: 100
    })*/

   /* const handleMouseDown = (e) => {
        dispatch({type: 'mouseDown'})
    }

    const handleMouseMove = (e) => {
        if (state.mouseDown) {
            dispatch({type: 'mouseMove', movementY: e.movementY})
        }
    }
*/
    /*const handleMouseUp = (e) => {

    }*/


    /*const {top, bottom, zIndex} = state*/
    return (
        <div data-component={'event'}
             data-id={id}
            className='event'
             style={{
                 backgroundColor: backgroundColor,
                /* zIndex: zIndex,*/
                 top, bottom, left, right
             }}
             /*onMouseDown={handleMouseDown}
             onMouseMove={handleMouseMove}*/
            /*onMouseUp={handleMouseUp}*/
        >
        </div>
    )
}

