import React from 'react'
import {useContainerState, useDimension, useStyle} from './hooks'
import Ball from './Ball'

const Bar = ({w, h, cb}) => {
    const {barStyle} = useStyle(w, h)
    return <div style = {barStyle()} onClick = {cb}>
    </div>
}

const BallContainer = (props) => {
    const {addElement, elements} = useContainerState('ball')
    console.log(elements)
    const {w, h} = useDimension()
    return <div>
      <Bar w = {w} h = {h} cb = {addElement}/>
      {elements.map((element) => <Ball scale = {element.scale} key = {element.key} w = {w} h = {h}/>)}
    </div>
}

export default BallContainer 