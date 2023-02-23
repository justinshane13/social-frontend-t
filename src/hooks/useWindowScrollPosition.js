import { useEffect, useState } from 'react'

export const useWindowScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0)

    useEffect(() => {
        function updatePosition() {
            setScrollPosition(window.scrollY)
        }

        window.addEventListener('scroll', updatePosition)
        updatePosition()

        return () => window.removeEventListener('scroll', updatePosition)
    }, [])

    return scrollPosition
}