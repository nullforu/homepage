import { useRef } from 'react'
import { useScrollAnimation } from './useScrollAnimation'
import { useMouseParallax } from './useMouseParallax'
import { useKeyboardNavigation } from './useKeyboardNavigation'
import { useDevice } from '../../../contexts/DeviceContext'

export function useHomeAnimations(disableAnimations = false) {
    const bgGridRef = useRef<HTMLDivElement>(null!)
    const bgGeoRef = useRef<HTMLDivElement>(null!)

    const { isMobile } = useDevice()
    const disabled = disableAnimations || isMobile

    const lenisRef = useScrollAnimation({
        bgGridRef,
        bgGeoRef,
        disableSmoothScroll: disabled,
        disableBackgroundTransition: disabled,
    })
    useMouseParallax({ gridRef: bgGridRef, geoRef: bgGeoRef, disabled })
    useKeyboardNavigation({ lenisRef, disabled })

    return { bgGridRef, bgGeoRef }
}
