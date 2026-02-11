type ProjectsSectionProps = {
    disableSticky?: boolean
}

export function ProjectsSection({ disableSticky = false }: ProjectsSectionProps) {
    return (
        <section
            className={`${disableSticky ? '' : 'sticky top-0'} flex min-h-screen w-full items-center px-0 py-16 md:py-0`}
            data-scroll-section
            data-bg='projects'
        >
            <div className='mx-auto w-full max-w-5xl px-10 sm:px-12 md:px-16 lg:px-20 xl:max-w-6xl' data-scroll-content>
                <p className='text-xs uppercase tracking-[0.35em] text-slate-500'>Projects</p>
                <h2 className='mt-6 text-3xl font-bold text-slate-900 md:text-5xl'>프로젝트</h2>
                <div className='mt-12 space-y-8 text-slate-700'>
                    <div className='flex gap-6'>
                        <span className='text-xs uppercase tracking-[0.35em] text-slate-500'>01</span>
                        <div>
                            <p className='text-lg font-semibold text-slate-900'>나중에</p>
                            <p className='mt-3'>추가 예정</p>
                        </div>
                    </div>
                    <div className='flex gap-6'>
                        <span className='text-xs uppercase tracking-[0.35em] text-slate-500'>02</span>
                        <div>
                            <p className='text-lg font-semibold text-slate-900'>ㅇㅇ</p>
                            <p className='mt-3'>추가 예정</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
