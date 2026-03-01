import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type DeviceContextValue = {
    isMobile: boolean
}

const DeviceContext = createContext<DeviceContextValue | null>(null)

const getIsMobile = () => {
    const byWidth = window.matchMedia('(max-width: 768px)').matches
    const byPointer = window.matchMedia('(pointer: coarse)').matches
    return byWidth || byPointer
}

export function DeviceProvider({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState<boolean>(() => getIsMobile())

    useEffect(() => {
        const mqWidth = window.matchMedia('(max-width: 768px)')
        const mqPointer = window.matchMedia('(pointer: coarse)')

        const onChange = () => setIsMobile(getIsMobile())

        if (mqWidth.addEventListener) {
            mqWidth.addEventListener('change', onChange)
            mqPointer.addEventListener('change', onChange)
        } else {
            mqWidth.addListener(onChange)
            mqPointer.addListener(onChange)
        }

        return () => {
            if (mqWidth.removeEventListener) {
                mqWidth.removeEventListener('change', onChange)
                mqPointer.removeEventListener('change', onChange)
            } else {
                mqWidth.removeListener(onChange)
                mqPointer.removeListener(onChange)
            }
        }
    }, [])

    const value = useMemo(() => ({ isMobile }), [isMobile])

    return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
}

export function useDevice() {
    const ctx = useContext(DeviceContext)
    if (!ctx) {
        throw new Error('useDevice must be used within a DeviceProvider')
    }
    return ctx
}
