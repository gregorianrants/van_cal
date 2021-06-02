import React from "react";
import {getNumPixels} from "../utilities/utilities";

/*
function reducer(state,action){
    if(action.type==='down'){
        return{
            ...state,
            down: true,
            listening: true
        }
    }
    else if(action.type==='mouseUp'){
        return{
            ...state,
            down: false
        }
    }
    else if(action.type==='stopListening'){
        return{
            ...state,
            listening: false
        }
    }
}


export default function useDrag(mouseMoveF,mouseUpF){
    const [mouse,dispatch]=React.useReducer(reducer,{
        down: false,
        listening: false,
        up: true,
    })

    const totalTranslationY = React.useRef(0)
    const initialTop = React.useRef(0)
    const height = React.useRef(0)

    const handleMouseMove = React.useCallback((e) => {
        totalTranslationY.current += e.movementY
        mouseMoveF(e.movementY,totalTranslationY.current,initialTop.current,height.current)
    },[mouseMoveF])//added this dependancy as suggested by error message, havent givn it much thought might be wort a look if get a bug

    const handleMouseUp = React.useCallback((e)=>{
        console.log(document.elementFromPoint(e.clientX, e.clientY))
        dispatch({type: 'mouseUp'})
        mouseUpF(totalTranslationY.current)
    },[mouseUpF])//added this dependancy as suggested by error message, havent givn it much thought might be wort a look if get a bug

    React.useEffect(()=>{
        if(mouse.down) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup',handleMouseUp)
        }
        if(!mouse.down & mouse.listening){
            window.removeEventListener('mousemove',handleMouseMove)
            window.removeEventListener('mouseup',handleMouseUp)
            dispatch({type: 'stopListening'})
        }

        return ()=>{
            if(mouse.listening){
                window.removeEventListener('mousemove',handleMouseMove)
                window.removeEventListener('mouseup',handleMouseUp)
            }
        }
    },[mouse,handleMouseMove,handleMouseUp])//added handleMOuseMove handleMouseUp dependancy as suggested by error message, havent givn it much thought might be wort a look if get a bug

    return (top,initialHeight)=>{
        dispatch({type: 'down'})
        totalTranslationY.current = 0
        initialTop.current = top
        height.current = initialHeight
        console.log('height' , height.current)
    }
}

*/


function reducer(state,action){
    if(action.type==='down'){
        return{
            ...state,
            down: true,
            listening: true
        }
    }
    else if(action.type==='mouseUp'){
        return{
            ...state,
            down: false
        }
    }
    else if(action.type==='stopListening'){
        return{
            ...state,
            listening: false
        }
    }
}


export default function useDrag(onDragStart,mouseMoveF,mouseUpF){
    const [dragable,setDragable]=React.useState(false)

    const totalTranslationY = React.useRef(0)

    const handleMouseMove = React.useCallback((e) => {
        totalTranslationY.current += e.movementY
        mouseMoveF(totalTranslationY.current,e.movementY)
    },[mouseMoveF])//added this dependancy as suggested by error message, havent givn it much thought might be wort a look if get a bug

    const handleMouseUp = React.useCallback((e)=>{
       setDragable(false)
        mouseUpF(totalTranslationY.current)
    },[mouseUpF])//added this dependancy as suggested by error message, havent givn it much thought might be wort a look if get a bug

    React.useEffect(()=>{
        if(dragable) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup',handleMouseUp)
        }

        return ()=>{
                window.removeEventListener('mousemove',handleMouseMove)
                window.removeEventListener('mouseup',handleMouseUp)
        }
    },[dragable,handleMouseMove,handleMouseUp])//added handleMOuseMove handleMouseUp dependancy as suggested by error message, havent givn it much thought might be wort a look if get a bug

    return (e)=>{
        e.preventDefault()
        setDragable(true)
        onDragStart()
        totalTranslationY.current = 0
    }
}


