import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { KEYBOARD_NAV_CONFIG } from '../constants'
import { easeOutCubic, isTypingElement, unique } from '../utils'

const DOWN_KEYS = ['arrowdown', 's', 'arrowright', 'd']
const UP_KEYS = ['arrowup', 'w', 'arrowleft', 'a']

type KeyboardNavigationOptions = {
    lenisRef: React.RefObject<Lenis | null>
    disabled: boolean
}

export function useKeyboardNavigation({ lenisRef, disabled }: KeyboardNavigationOptions) {
    const targetsRef = useRef<HTMLElement[]>([])
    const topsRef = useRef<number[]>([])
    const lastNavAtRef = useRef(0)

    useEffect(() => {
        const lenis = lenisRef.current
        if (!lenis || disabled) return

        const measureSections = () => {
            const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-section]'))
            targetsRef.current = unique(
                sections.map((s) => (s.parentElement instanceof HTMLElement ? s.parentElement : s)).filter(Boolean),
            )
            const y = window.scrollY
            topsRef.current = targetsRef.current.map((el) => el.getBoundingClientRect().top + y)
        }

        const currentIndex = () => {
            const y = lenis.scroll
            const vh = window.innerHeight
            let idx = 0
            for (let i = 0; i < topsRef.current.length; i++) {
                if (y >= topsRef.current[i] - vh * 0.35) idx = i
            }
            return idx
        }

        const scrollToIndex = (idx: number) => {
            const clamped = Math.max(0, Math.min(idx, targetsRef.current.length - 1))
            const target = targetsRef.current[clamped]
            if (!target) return

            lenis.scrollTo(target, {
                immediate: disabled,
                duration: disabled ? 0 : KEYBOARD_NAV_CONFIG.scrollDuration,
                easing: easeOutCubic,
            })
        }

        const scrollToBottom = () => {
            lenis.scrollTo(document.body.scrollHeight, {
                immediate: disabled,
                duration: disabled ? 0 : KEYBOARD_NAV_CONFIG.scrollDuration,
                easing: easeOutCubic,
            })
        }

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.metaKey || e.ctrlKey || e.altKey) return
            if (e.repeat) return
            if (isTypingElement(document.activeElement)) return

            const k = e.key.toLowerCase()
            const dir = DOWN_KEYS.includes(k) ? 1 : UP_KEYS.includes(k) ? -1 : 0

            if (!dir) return

            e.preventDefault()

            const now = performance.now()
            if (now - lastNavAtRef.current < KEYBOARD_NAV_CONFIG.cooldownMs) return
            lastNavAtRef.current = now

            if (!targetsRef.current.length || targetsRef.current.length !== topsRef.current.length) measureSections()

            const idx = currentIndex()
            const next = idx + dir

            if (next < 0) return

            if (next >= targetsRef.current.length) {
                scrollToBottom()
                return
            }

            scrollToIndex(next)
        }

        measureSections()
        ScrollTrigger.addEventListener('refresh', measureSections)
        window.addEventListener('keydown', onKeyDown, { passive: false })

        return () => {
            window.removeEventListener('keydown', onKeyDown)
            ScrollTrigger.removeEventListener('refresh', measureSections)
        }
    }, [lenisRef, disabled])
}
