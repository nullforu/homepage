import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BgPreset } from '../types'
import { BG_PRESETS } from '../constants'
import { easeOutCubic, clamp } from '../utils'

type ScrollAnimationOptions = {
    bgGridRef: React.RefObject<HTMLDivElement>
    bgGeoRef: React.RefObject<HTMLDivElement>
    disableSmoothScroll: boolean
    disableBackgroundTransition: boolean
}

export function useScrollAnimation({
    bgGridRef,
    bgGeoRef,
    disableSmoothScroll,
    disableBackgroundTransition,
}: ScrollAnimationOptions) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const root = document.documentElement

        const applyBg = (p: BgPreset) => {
            const grid = bgGridRef.current
            const geo = bgGeoRef.current
            if (!grid || !geo) return

            const gx = clamp(p.gridX, -3, 3)
            const gy = clamp(p.gridY, -3, 3)
            const dx = clamp(p.dotX, -3, 3)
            const dy = clamp(p.dotY, -3, 3)

            const rot = clamp(p.rot, -0.12, 0.12)
            const skewX = clamp(p.skewX, -0.05, 0.05)

            gsap.to([grid, geo], {
                duration: 0.95,
                ease: 'sine.out',
                overwrite: 'auto',
                '--gridX': `${gx}px`,
                '--gridY': `${gy}px`,
                '--dotX': `${dx}px`,
                '--dotY': `${dy}px`,
                '--bgScale': p.scale,
                '--bgRot': `${rot}deg`,
                '--bgSkewX': `${skewX}deg`,
            } as any)

            gsap.to(grid, {
                duration: 0.95,
                ease: 'sine.out',
                overwrite: 'auto',
                '--gridSize': `${p.gridSize}px`,
                '--gridAlpha': p.gridAlpha,
                '--glowX': `${p.glowX}%`,
                '--glowY': `${p.glowY}%`,
                '--glowAlpha': p.glowAlpha,
            } as any)

            gsap.to(geo, {
                duration: 0.95,
                ease: 'sine.out',
                overwrite: 'auto',
                '--hatchSize': `${p.hatchSize}px`,
                '--hatchAlpha': p.hatchAlpha,
                '--hatchThickness': `${p.hatchThickness}px`,
                '--dotSize': `${p.dotSize}px`,
                '--dotAlpha': p.dotAlpha,
                '--dotR': `${p.dotR}px`,
            } as any)
        }

        if (disableSmoothScroll) {
            ScrollTrigger.defaults({
                scroller: window,
            })

            const ctx = gsap.context(() => {
                applyBg(BG_PRESETS.hero)
            })

            const refresh = () => ScrollTrigger.refresh()
            window.addEventListener('resize', refresh)
            requestAnimationFrame(() => ScrollTrigger.refresh())

            return () => {
                window.removeEventListener('resize', refresh)
                ctx.revert()
                ScrollTrigger.getAll().forEach((t) => t.kill())
                lenisRef.current = null
            }
        }

        const lenis = new Lenis({
            smoothWheel: true,
            lerp: 0.075,
            wheelMultiplier: 0.85,
            easing: easeOutCubic,
        })

        lenisRef.current = lenis

        ScrollTrigger.scrollerProxy(root, {
            scrollTop(value) {
                if (typeof value === 'number') lenis.scrollTo(value, { immediate: true })
                return lenis.scroll
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
            },
            pinType: root.style.transform ? 'transform' : 'fixed',
        })

        const onLenisScroll = () => ScrollTrigger.update()
        lenis.on('scroll', onLenisScroll)

        const onTick = (time: number) => lenis.raf(time * 1000)
        gsap.ticker.add(onTick)
        gsap.ticker.lagSmoothing(0)

        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray<HTMLElement>('[data-scroll-section]')

            applyBg(BG_PRESETS.hero)

            sections.forEach((section) => {
                const content = section.querySelector<HTMLElement>('[data-scroll-content]')

                if (content && !disableSmoothScroll) {
                    gsap.to(content, {
                        y: -10,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1.4,
                            invalidateOnRefresh: true,
                        },
                    })

                    gsap.fromTo(
                        content,
                        { opacity: 0.92, filter: 'blur(0.3px)' },
                        {
                            opacity: 1,
                            filter: 'blur(0px)',
                            ease: 'none',
                            scrollTrigger: {
                                trigger: section,
                                start: 'top 75%',
                                end: 'top 40%',
                                scrub: 1.4,
                                invalidateOnRefresh: true,
                            },
                        },
                    )
                }

                if (!disableBackgroundTransition) {
                    const key = section.getAttribute('data-bg') || 'hero'
                    const preset = BG_PRESETS[key] ?? BG_PRESETS.hero

                    ScrollTrigger.create({
                        trigger: section,
                        start: 'top 55%',
                        end: 'bottom 45%',
                        onEnter: () => applyBg(preset),
                        onEnterBack: () => applyBg(preset),
                    })
                }
            })

            if (!disableBackgroundTransition) {
                ScrollTrigger.create({
                    start: 0,
                    end: () => ScrollTrigger.maxScroll(window),
                    scrub: 4.2,
                    onUpdate: (self) => {
                        const grid = bgGridRef.current
                        const geo = bgGeoRef.current
                        if (!grid || !geo) return

                        const t = self.progress
                        const driftX = Math.round(Math.sin(t * Math.PI * 2) * 1)
                        const driftY = Math.round(Math.cos(t * Math.PI * 2) * 1)

                        const rotJitter = Math.sin(t * Math.PI * 2) * 0.03
                        const skewJitter = Math.cos(t * Math.PI * 2) * 0.02

                        gsap.set([grid, geo], {
                            '--driftX': `${driftX}px`,
                            '--driftY': `${driftY}px`,
                            '--rotJitter': `${rotJitter}deg`,
                            '--skewJitter': `${skewJitter}deg`,
                        } as any)
                    },
                })
            }
        })

        const refresh = () => ScrollTrigger.refresh()
        window.addEventListener('resize', refresh)
        requestAnimationFrame(() => ScrollTrigger.refresh())

        return () => {
            window.removeEventListener('resize', refresh)
            ctx.revert()
            lenis.off('scroll', onLenisScroll)
            gsap.ticker.remove(onTick)
            lenis.destroy()
            ScrollTrigger.getAll().forEach((t) => t.kill())
            lenisRef.current = null
        }
    }, [bgGridRef, bgGeoRef, disableSmoothScroll, disableBackgroundTransition])

    return lenisRef
}
