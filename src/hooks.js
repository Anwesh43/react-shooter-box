import {useState, useEffect} from 'react'
$
export const useAnimatedScale = (scGap = 0.02, delay = 20) => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                let currScale = scale 
                const interval = setInterval(() => {
                    currScale += scGap 
                    setScale(currScale)
                    if (currScale > 1) {
                        setScale(0)
                        setAnimated(false)
                        clearInterval(interval)
                    }
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
      window.onresize = () => {
        setW(window.innerWidth)
        setH(window.innerHeight)
      }  
        return () => {
            window.onresize = () => {

            }
         }
    })
    
    return {
        w, 
        h
    }
}

export const useStyle = (w, h) => {
    const position = 'absolute'
    const background = 'indigo'
    return {
        barStyle() {
            const barSize = Math.min(w, h) / 5
            const top = `${h - barSize}px`
            const left = `${w / 2 - barSize / 2}px`
            const width = `${barSize}px`
            const height = `${barSize}px`
            
            return {position, top, left, width, height, background}
        },
        circleStyle(scale) {
            const radius = Math.min(W, h) / 12 
            const width = `${radius}px`
            const height = `${radius}px`
            const left = `${w / 2 - radius / 2}px`
            const top = `${h - size - h * scale}px`
            const borderRadius = '50%'
            return {position, width, height, left, top, borderRadius, background}
        }

    }
} 

export const useContainerState = (label) => {
   const [elements, setElements] = useState([])
   const [i, setI] = useState(0)
   return {
      addElement() {
          let curr = i + 1 
          elements = `${label}_${curr}`
          setI(i + 1)
          setElements([...elements, curr])
      },
      removeElement(curr) {
        setElements(elements.filter(element => element !== curr))
      }
   }
}
