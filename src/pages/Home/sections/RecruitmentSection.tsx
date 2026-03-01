import { Link } from 'react-router-dom'

type RecruitmentSectionProps = {
    disableSticky?: boolean
}

export function RecruitmentSection({ disableSticky = false }: RecruitmentSectionProps) {
    return (
        <section
            className={`${disableSticky ? '' : 'sticky top-0'} flex min-h-screen w-full items-center px-0 py-16 md:py-0`}
            data-scroll-section
            data-bg='recruitment'
        >
            <div className='mx-auto w-full max-w-5xl px-6 sm:px-12 md:px-16 lg:px-20 xl:max-w-6xl' data-scroll-content>
                <p className='text-xs uppercase tracking-[0.35em] text-slate-500'>Recruitment</p>
                <h2 className='mt-6 text-3xl font-bold text-slate-900 md:text-5xl'>모집 안내</h2>
                <p className='mt-6 text-slate-700'>새로운 여정을 함께할 멤버를 찾습니다.</p>
                <div className='mt-10 flex flex-wrap gap-3'>
                    <Link
                        to='/recruitment'
                        className='rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5'
                    >
                        모집 안내
                    </Link>
                    <Link
                        to='/notices'
                        className='rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5'
                    >
                        소식
                    </Link>
                </div>
            </div>
        </section>
    )
}
