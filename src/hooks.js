import {useState, useEffect} from 'react'

const scaleGap = 0.2, DELAY = 20
export const useAnimatedScale = (scGap = 0.02, delay = 20, onStop) => {
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
                        onStop()
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
    const barSize = Math.min(w, h) / 5
    return {
        barStyle() {
            const top = `${h - barSize}px`
            const left = `${w / 2 - barSize / 2}px`
            const width = `${barSize}px`
            const height = `${barSize}px`
            
            return {position, top, left, width, height, background}
        },
        circleStyle(scale) {
            const radius = Math.min(w, h) / 12 
            const width = `${radius}px`
            const height = `${radius}px`
            const left = `${w / 2 - radius / 2}px`
            const top = `${h - barSize - h * scale}px`
            const borderRadius = '50%'
            return {position, width, height, left, top, borderRadius, background}
        }

    }
} 

class AnimatorStore {
    
    elements = []
    interval = -1

    start(cb) {
        if (this.interval != -1) {
            return 
        }
        this.interval = setInterval( () => {
            this.update(cb)
        }, 100)
    }

    addElement(element) {
        this.elements.push(element)
    }

    update(cb) {
        const stopKeys = []
        this.elements.forEach((element) => {
            element.scale += 0.1
            if (element.scale > 1) {
                stopKeys.push(element.key)
            }
            //console.log(element)
            cb(this.elements)
        })
        //console.log(this.elements)
        const l = this.elements.length
        stopKeys.forEach((key) => {
            this.elements = this.elements.filter(element => element.key !== key)
        })
        //console.log(this.elements)
        if (l != this.elements.length) {
            cb(this.elements)
        }
        if (this.elements.length == 0) {
            this.stop()
        }
    }

    stop() {
        clearInterval(this.interval)
        this.interval = -1
    }
}

//const animator = new AnimatorStore()

export const useContainerState = (label) => {
   const [elements, setElements] = useState([])
   const [i, setI] = useState(0)  
   const [k, setK] = useState(0)
   useEffect(() => {

        const interval = setInterval(() => {
            const stopKeys = []
            if (elements.length != 0) {
              //console.log(elements)
              setK(k + 1)
              //console.log(k)
            }
            elements.forEach((element) => {
                element.scale += 0.02 
                if (element.scale > 1) {
                    stopKeys.push(element.key)
                }
            })
            let newElements = elements
            stopKeys.forEach((key) => {
                newElements = newElements.filter(element => element.key !== key)
            })
            setElements(newElements)
        }, DELAY)
        return () => clearInterval(interval)
   })
  //  if (elements.length != 0) {
  //     console.log(elements)
  //  }
    return {
        addElement() {
            const currI = i + 1
            const key = `${label}_${currI}`
            const scale = 0
            const element = {key, scale}
            const newElements = [...elements, element]
            setI(i + 1)
            //animator.addElement(element)
            setElements(newElements)
            // if (newElements.length == 1) {
            //     animator.start((elements) => {
            //         console.log("new")
            //         setElements(elements)
            //     })
            // }
        },
        elements
   }
}
