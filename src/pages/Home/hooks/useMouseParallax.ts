import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MOUSE_PARALLAX_CONFIG } from '../constants'

type MouseParallaxOptions = {
    gridRef: React.RefObject<HTMLDivElement>
    geoRef: React.RefObject<HTMLDivElement>
    disabled: boolean
}

export function useMouseParallax({ gridRef, geoRef, disabled }: MouseParallaxOptions) {
    const rafIdRef = useRef(0)
    const isAnimatingRef = useRef(false)
    const targetNXRef = useRef(0)
    const targetNYRef = useRef(0)
    const curNXRef = useRef(0)
    const curNYRef = useRef(0)

    useEffect(() => {
        if (disabled) return

        const grid = gridRef.current
        const geo = geoRef.current
        if (!grid || !geo) return

        const { strengthPx, rotStrengthDeg, skewStrengthDeg, lerp } = MOUSE_PARALLAX_CONFIG

        const setMouseVars = (mx: number, my: number) => {
            const mRot = (mx / strengthPx) * rotStrengthDeg
            const mSkew = (my / strengthPx) * skewStrengthDeg

            gsap.set([grid, geo], {
                '--mouseX': `${mx}px`,
                '--mouseY': `${my}px`,
                '--mouseRot': `${mRot}deg`,
                '--mouseSkew': `${mSkew}deg`,
                '--mouseXGrid': `${mx * 0.3}px`,
                '--mouseYGrid': `${my * 0.3}px`,
                '--mouseXGeoHatch': `${mx * 0.15}px`,
                '--mouseYGeoHatch': `${my * 0.15}px`,
                '--mouseXGeoDot': `${mx * 0.35}px`,
                '--mouseYGeoDot': `${my * 0.35}px`,
                '--mouseXGeoT': `${mx * 0.4}px`,
                '--mouseYGeoT': `${my * 0.4}px`,
                '--mouseRotGeo': `${mRot * 0.6}deg`,
                '--mouseSkewGeo': `${mSkew * 0.6}deg`,
            } as any)
        }

        const startAnimation = () => {
            if (isAnimatingRef.current) return
            isAnimatingRef.current = true
            rafIdRef.current = requestAnimationFrame(tickMouse)
        }

        const stopAnimation = () => {
            isAnimatingRef.current = false
            cancelAnimationFrame(rafIdRef.current)
        }

        const tickMouse = () => {
            curNXRef.current += (targetNXRef.current - curNXRef.current) * lerp
            curNYRef.current += (targetNYRef.current - curNYRef.current) * lerp

            const dx = Math.abs(targetNXRef.current - curNXRef.current)
            const dy = Math.abs(targetNYRef.current - curNYRef.current)

            const mx = curNXRef.current * strengthPx
            const my = curNYRef.current * strengthPx

            setMouseVars(mx, my)

            if (dx < 0.001 && dy < 0.001) {
                stopAnimation()
                return
            }

            rafIdRef.current = requestAnimationFrame(tickMouse)
        }

        const onMouseMove = (e: MouseEvent) => {
            targetNXRef.current = (e.clientX / window.innerWidth) * 2 - 1
            targetNYRef.current = (e.clientY / window.innerHeight) * 2 - 1
            startAnimation()
        }

        window.addEventListener('mousemove', onMouseMove, { passive: true })
        setMouseVars(0, 0)
        rafIdRef.current = requestAnimationFrame(tickMouse)

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
        }
    }, [disabled, gridRef, geoRef])
}
