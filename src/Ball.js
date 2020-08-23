import React, {useEffect} from 'react'
import {useAnimatedScale, useStyle} from './hooks'

const Ball = ({i, w, h, scale}) => {
    const {circleStyle} = useStyle(w, h)
    const {scale, start} = useAnimatedScale(0.02, 20)
    useEffect(() => {
        start()
    })
    return (<div style = {circleStyle(i)}>
    </div>)
}