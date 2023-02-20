import { useState, useEffect } from 'react'

const getWindowWidth = () => {
    const width = window.innerWidth
    return width
}

export const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(getWindowWidth())

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(getWindowWidth())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [windowWidth])

    return windowWidth
}