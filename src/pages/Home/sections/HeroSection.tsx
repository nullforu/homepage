import { Link } from 'react-router-dom'
import PencilUnderline from '../../../components/PencilUnderline'
import { useDevice } from '../../../contexts/DeviceContext'

type HeroSectionProps = {
    disableSticky?: boolean
}

export function HeroSection({ disableSticky = false }: HeroSectionProps) {
    const { isMobile } = useDevice()

    return (
        <section
            className={`${disableSticky ? '' : 'sticky top-0'} flex min-h-screen w-full items-center px-0 py-16 md:py-0`}
            data-scroll-section
            data-bg='hero'
        >
            <div
                className='mx-auto flex w-full max-w-5xl flex-col justify-center gap-8 px-6 sm:px-12 md:px-16 lg:px-20 xl:max-w-6xl'
                data-scroll-content
            >
                <div className='max-w-2xl'>
                    {isMobile ? (
                        <div className='text-base md:text-base uppercase tracking-[0.25em] text-gray-500 flex flex-col'>
                            <span>세명컴퓨터고등학교</span>
                            <span>전공 심화 동아리</span>
                        </div>
                    ) : (
                        <p className='text-base md:text-base uppercase tracking-[0.25em] text-gray-500'>
                            세명컴퓨터고등학교 · 전공 심화 동아리
                        </p>
                    )}
                    <h1 className='mt-6 text-5xl font-extrabold leading-[1.05] text-slate-900 md:text-6xl'>
                        <span className='text-black/80 hover:text-black transition duration-600'>Hello,</span>
                        <span className='pencil-wrap cursive-font font-medium ml-2'>
                            <PencilUnderline>Null4U</PencilUnderline>
                        </span>
                    </h1>
                    <p className='mt-12 text-lg md:text-xl leading-relaxed text-slate-700'>
                        안녕하세요,{' '}
                        <img
                            src='/images/wave.svg'
                            alt='Wave'
                            className='wave-emoji h-8 w-auto inline-block align-middle mb-2 ml-1'
                        />
                    </p>
                    <p className='mt-1 text-lg md:text-xl leading-relaxed text-slate-700'>
                        <span className='font-medium bg-yellow-50'>클라우드 네이티브</span>와{' '}
                        <span className='font-medium bg-yellow-50'>DevSecOps</span>를 지향하는 저희는{' '}
                        <span className='font-medium bg-black/10 text-black/70 px-1 font-mono cursor-pointer hover:bg-black/80 hover:text-white transition duration-400'>
                            #Null4U
                        </span>
                        입니다.
                    </p>
                    <div className='mt-10 flex flex-wrap gap-3 items-center'>
                        <Link
                            to='/about'
                            className='rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-[1px]'
                        >
                            소개 및 커리큘럼
                        </Link>
                        <Link
                            to='/recruitment'
                            className='rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-[1px]'
                        >
                            모집 안내
                        </Link>
                        <img
                            src='/images/github.svg'
                            alt='GitHub'
                            className='ml-4 h-10 w-auto transition hover:-translate-y-[1px] cursor-pointer'
                            onClick={() => window.open('https://github.com/nullforu', '_blank')}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
