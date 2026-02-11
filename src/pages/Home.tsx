import { useState } from 'react'
import { Layout } from '../components/Layout'
import { AnimatedBackground } from './Home/AnimatedBackground'
import { SectionWrap } from './Home/SectionWrap'
import { HeroSection } from './Home/sections/HeroSection'
import { AboutSection } from './Home/sections/AboutSection'
import { ProjectsSection } from './Home/sections/ProjectsSection'
import { CurriculumSection } from './Home/sections/CurriculumSection'
import { RecruitmentSection } from './Home/sections/RecruitmentSection'
import { useHomeAnimations } from './Home/hooks/useHomeAnimations'
import { useHomeSettings } from './Home/hooks/useHomeSettings'
import { SettingsButton } from './Home/SettingsButton'
import { SettingsModal } from './Home/SettingsModal'
import { ScrollHint } from './Home/ScrollHint'

export const Home = () => {
    const { settings, updateSettings } = useHomeSettings()
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const { bgGridRef, bgGeoRef } = useHomeAnimations(settings.disableAnimations)

    return (
        <Layout>
            <div className='relative isolate -mt-14 w-full bg-white'>
                <AnimatedBackground gridRef={bgGridRef} geoRef={bgGeoRef} />

                <SectionWrap
                    id='hero'
                    heightClassName='h-[170vh] md:h-[185vh]'
                    disableSticky={settings.disableAnimations}
                >
                    <HeroSection disableSticky={settings.disableAnimations} />
                </SectionWrap>

                <SectionWrap id='about' disableSticky={settings.disableAnimations}>
                    <AboutSection disableSticky={settings.disableAnimations} />
                </SectionWrap>

                <SectionWrap id='projects' disableSticky={settings.disableAnimations}>
                    <ProjectsSection disableSticky={settings.disableAnimations} />
                </SectionWrap>

                <SectionWrap id='curriculum' disableSticky={settings.disableAnimations}>
                    <CurriculumSection disableSticky={settings.disableAnimations} />
                </SectionWrap>

                <SectionWrap
                    id='recruitment'
                    heightClassName='h-[200vh] md:h-[210vh]'
                    disableSticky={settings.disableAnimations}
                >
                    <RecruitmentSection disableSticky={settings.disableAnimations} />
                </SectionWrap>

                <SectionWrap id='quote' heightClassName='h-screen' disableSticky={settings.disableAnimations}>
                    <section
                        className={`${settings.disableAnimations ? '' : 'sticky top-0'} flex min-h-screen w-full items-center px-0 py-16 md:py-0 text-center`}
                        data-scroll-section
                    >
                        <div
                            className='mx-auto w-full max-w-5xl px-10 sm:px-12 md:px-16 lg:px-20 xl:max-w-6xl'
                            data-scroll-content
                        >
                            <p className='text-3xl xl:text-4xl font-medium text-slate-900'>
                                " There is no compression algorithm for experience. "
                            </p>
                            <p className='mt-4 text-xl xl:text-2xl text-slate-600'>경험을 압축하는 알고리즘이 없다.</p>
                            <p className='mt-8 xl:mt-12 text-xl xl:text-2xl text-slate-700 text-end'>
                                — Amazon CEO, Andy Jassy
                            </p>
                        </div>
                    </section>
                </SectionWrap>

                <SettingsButton onClick={() => setIsSettingsOpen(true)} />

                <ScrollHint />

                <SettingsModal
                    isOpen={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                    disableAnimations={settings.disableAnimations}
                    onToggleAnimations={() => updateSettings({ disableAnimations: !settings.disableAnimations })}
                />
            </div>
        </Layout>
    )
}
