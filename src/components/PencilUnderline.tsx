import { useEffect, useRef } from 'react'

type Props = {
    children: React.ReactNode
    className?: string
}

export default function PencilUnderline({ children, className }: Props) {
    const pathRef = useRef<SVGPathElement>(null)

    useEffect(() => {
        const path = pathRef.current
        if (!path) return

        const length = path.getTotalLength()
        path.style.strokeDasharray = `${length}`
        path.style.strokeDashoffset = `${length}`

        requestAnimationFrame(() => {
            path.style.transition = 'stroke-dashoffset 3000ms cubic-bezier(.3,.75,.3,1)'
            path.style.strokeDashoffset = '0'
        })
    }, [])

    return (
        <span className={`relative inline-block ${className ?? ''}`}>
            {children}

            <svg
                viewBox='0 0 500 40'
                preserveAspectRatio='none'
                className='absolute left-0 -bottom-[14px] w-full h-[32px] pointer-events-none'
            >
                <path
                    ref={pathRef}
                    d='M10 26 L80 22 L140 27 L210 21 L280 25 L350 20 L420 24 L490 22'
                    stroke='currentColor'
                    strokeWidth='3.5'
                    strokeLinecap='round'
                    fill='none'
                    opacity='0.9'
                />
            </svg>
        </span>
    )
}
