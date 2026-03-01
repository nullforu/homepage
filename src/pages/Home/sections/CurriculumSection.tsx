type CurriculumSectionProps = {
    disableSticky?: boolean
}

export function CurriculumSection({ disableSticky = false }: CurriculumSectionProps) {
    return (
        <section
            className={`${disableSticky ? '' : 'sticky top-0'} flex min-h-screen w-full items-center px-0 py-16 md:py-0`}
            data-scroll-section
            data-bg='curriculum'
        >
            <div className='mx-auto w-full max-w-5xl px-6 sm:px-12 md:px-16 lg:px-20 xl:max-w-6xl' data-scroll-content>
                <p className='text-xs uppercase tracking-[0.35em] text-slate-500'>Curriculum</p>
                <h2 className='mt-6 text-3xl font-bold text-slate-900 md:text-5xl'>커리큘럼</h2>
                <div className='mt-12 grid gap-10 md:grid-cols-3'>
                    <div>
                        <p className='text-xs uppercase tracking-[0.35em] text-slate-500'>나</p>
                        <p className='mt-3 text-slate-700'>추가 예정</p>
                    </div>
                    <div>
                        <p className='text-xs uppercase tracking-[0.35em] text-slate-500'>중</p>
                        <p className='mt-3 text-slate-700'>추가 예정</p>
                    </div>
                    <div>
                        <p className='text-xs uppercase tracking-[0.35em] text-slate-500'>에</p>
                        <p className='mt-3 text-slate-700'>추가 예정</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
