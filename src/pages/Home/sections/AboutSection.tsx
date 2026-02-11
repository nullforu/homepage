type AboutSectionProps = {
    disableSticky?: boolean
}

export function AboutSection({ disableSticky = false }: AboutSectionProps) {
    return (
        <section
            className={`${disableSticky ? '' : 'sticky top-0'} flex min-h-screen w-full items-center px-0 py-16 md:py-0`}
            data-scroll-section
            data-bg='about'
        >
            <div className='mx-auto w-full max-w-5xl px-10 sm:px-12 md:px-16 lg:px-20 xl:max-w-6xl' data-scroll-content>
                <p className='text-xs uppercase tracking-[0.35em] text-slate-500'>About</p>
                <h2 className='mt-6 text-3xl font-bold text-slate-900 md:text-5xl'>언제까지 개발만 하고</h2>
                <h2 className='mt-4 text-3xl font-bold text-slate-900 md:text-5xl'>
                    <span className='text-amber-500'>배포</span>는 안 해볼 건가요?
                </h2>
                <div className='mt-12 grid xl:grid-cols-2 gap-x-10 gap-y-20'>
                    <div>
                        <h3 className='text-lg font-semibold text-slate-900'>우리는</h3>
                        <ul className='mt-5 list-disc space-y-2 pl-5 text-slate-700'>
                            <li className='leading-relaxed'>
                                풀스택 개발 및 애플리케이션을 구현하는 것을 포함하는 것을 넘어
                                <br />
                                <span className='bg-amber-50'>인프라 설계</span>와{' '}
                                <span className='bg-amber-50'>배포</span>를 통한 서비스 운영, Kubernetes 오케스트레이션
                                <br />
                                그리고 보안과 모니터링 및 관측성, 자동화까지.
                            </li>
                            <li>클라우드 네이티브 지향적인 DevSecOps 동아리입니다.</li>
                            <li>데이터 엔지니어링(DE), 빅데이터 분석(DA) 및 MLOps 등을 포함합니다.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className='text-lg font-semibold text-slate-900'>그리고</h3>
                        <ul className='mt-5 list-disc space-y-2 pl-5 text-slate-700'>
                            <li>오픈소스를 지향하며 협업 및 커뮤니티 활동을 장려합니다.</li>
                            <li className='leading-relaxed'>
                                실전 프로젝트를 통해 실무/협업 경험과
                                <br />
                                포트폴리오를 쌓을 수 있는 기회를 제공합니다.
                            </li>
                            <li>단순한 경험을 넘어 실질적인 역량을 키우는 것을 목표로 합니다.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className='text-lg font-semibold text-slate-900'>클라우드와 개발에 진심인</h3>
                        <ul className='mt-5 list-disc space-y-2 pl-5 text-slate-700'>
                            <li className='leading-relaxed'>
                                세명컴퓨터고등학교 전공 심화 동아리 Null4U와 함께
                                <br />
                                당신의 잠재력을 최대한 발휘해보세요.
                            </li>
                            <li>함께 성장하고 혁신을 이끌어갈 멤버를 기다립니다.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
