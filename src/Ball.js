import React, {useEffect} from 'react'
import {useAnimatedScale, useStyle} from './hooks'

const Ball = ({w, h, scale}) => {
    const {circleStyle} = useStyle(w, h)
    return (<div style = {circleStyle(scale)}>
    </div>)
}

export default Ball