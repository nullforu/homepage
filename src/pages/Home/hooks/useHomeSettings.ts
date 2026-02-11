import { useState, useEffect } from 'react'

const STORAGE_KEY = 'home-settings'

type HomeSettings = {
    disableAnimations: boolean
}

const defaultSettings: HomeSettings = {
    disableAnimations: false,
}

export function useHomeSettings() {
    const [settings, setSettings] = useState<HomeSettings>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                return { ...defaultSettings, ...JSON.parse(stored) }
            }
        } catch (e) {
            console.error('Failed to load settings:', e)
        }
        return defaultSettings
    })

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
        } catch (e) {
            console.error('Failed to save settings:', e)
        }
    }, [settings])

    const updateSettings = (partial: Partial<HomeSettings>) => {
        setSettings((prev) => ({ ...prev, ...partial }))
    }

    return { settings, updateSettings }
}
