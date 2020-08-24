import React, {useEffect} from 'react'
import {useAnimatedScale, useStyle} from './hooks'

const Ball = ({w, h, onStop}) => {
    const {circleStyle} = useStyle(w, h)
    const {scale, start} = useAnimatedScale(0.02, 20, onStop)
    useEffect(() => {
        start()
    })
    return (<div style = {circleStyle(scale)}>
    </div>)
}

export default Ball