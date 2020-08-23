export const maxScale = (scale, i, n) => Math.max(0, scale - i / n)

export const divideScale = (scale, i, n) => Math.min(1 / n, maxScale(scale, i, n)) * n 

export const sinify = (scale) => Math.sin(scale * Math.PI)
