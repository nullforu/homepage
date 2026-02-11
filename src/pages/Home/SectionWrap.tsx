import { useState, useEffect } from 'react'
import { SectionWrapProps } from './types'

export function SectionWrap({
    children,
    heightClassName = 'h-[210vh] md:h-[220vh]',
    disableSticky = false,
    id,
}: SectionWrapProps) {
    const [opacity, setOpacity] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpacity(1)
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div
            id={id}
            className={disableSticky ? 'min-h-screen' : heightClassName}
            style={{
                opacity,
                transition: 'opacity 1.2s ease-in-out',
            }}
        >
            {children}
        </div>
    )
}
