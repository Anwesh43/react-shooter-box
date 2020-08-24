import React from 'react'
import {useContainerState, useDimension, useStyle} from './hooks'
import Ball from './Ball'

const Bar = ({w, h, cb}) => {
    const {barStyle} = useStyle(w, h)
    return <div style = {barStyle()} onClick = {cb}>
    </div>
}

const BallContainer = (props) => {
    const {addElement, removeElement, elements} = useContainerState('ball')
    const {w, h} = useDimension()
    return <div>
      <Bar w = {w} h = {h} cb = {addElement}/>
      {elements.map((element) => <Ball scale = {scale} w = {w} h = {h} onStop = {() => removeElement(element)}/>)}
    </div>
}

export default BallContainer 