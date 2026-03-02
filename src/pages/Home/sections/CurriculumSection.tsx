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
            <div
                className='mx-auto w-full max-w-5xl px-6 sm:px-12 md:px-16 lg:px-20 xl:max-w-6xl break-keep'
                data-scroll-content
            >
                <p className='text-xs uppercase tracking-[0.35em] text-slate-500'>Curriculum</p>

                <h2 className='mt-6 text-3xl font-bold text-slate-900 md:text-5xl'>커리큘럼</h2>

                <p className='mt-6 max-w-3xl text-slate-600 leading-relaxed'>
                    Null4U의 커리큘럼은 DevOps 로드맵을 기반으로 구성됩니다. 자세한 내용은 커리큘럼 페이지를
                    참고해주세요.
                </p>

                <div className='mt-4 grid gap-12 md:grid-cols-3'>
                    <div>
                        <p className='text-xs uppercase tracking-[0.35em] text-slate-500'>기본/기초</p>

                        <ul className='mt-6 space-y-4 text-slate-700 leading-relaxed text-sm'>
                            <li>
                                <strong>개발 지식</strong>
                                <br />
                                프로그래밍 언어, 백엔드/프론트엔드 웹 개발, Git 등
                            </li>
                            <li>
                                <strong>서버/운영체제 운영</strong>
                                <br />
                                리눅스 서버, 네트워크 기초, VM 및 컨테이너 기초
                            </li>
                            <li>
                                <strong>클라우드 컴퓨팅</strong>
                                <br />
                                AWS/GCP, IaC, 매니지드 서비스 활용
                            </li>
                            <li>
                                <strong>컨테이너 오케스트레이션</strong>
                                <br />
                                Docker, Kubernetes
                            </li>
                            <li>
                                <strong>CI/CD</strong>
                                <br />
                                Jenkins, GitHub Actions
                            </li>
                            <li>
                                <strong>옵저버빌리티</strong>
                                <br />
                                Prometheus, Grafana, ELK
                            </li>
                            <li>
                                <strong>인프라 자동화</strong>
                                <br />
                                GitOps, Ansible, Terraform
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className='text-xs uppercase tracking-[0.35em] text-slate-500'>응용/심화</p>

                        <ul className='mt-6 space-y-4 text-slate-700 leading-relaxed text-sm'>
                            <li>
                                <strong>보안 (DevSecOps)</strong>
                                <br />
                                네트워크·웹·시스템 보안
                            </li>
                            <li>
                                <strong>데이터 엔지니어링</strong>
                                <br />
                                빅데이터 처리, 데이터 파이프라인
                            </li>
                            <li>
                                <strong>아키텍처 설계</strong>
                                <br />
                                MSA, EDA, 서버리스
                            </li>
                            <li>
                                <strong>비용 최적화</strong>
                                <br />
                                클라우드 비용 관리 전략
                            </li>
                            <li>
                                <strong>정책/거버넌스</strong>
                                <br />
                                규제 준수 및 보안 정책 수립
                            </li>
                            <li>
                                <strong>MLOps</strong>
                                <br />
                                모델 배포 및 운영
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className='text-xs uppercase tracking-[0.35em] text-slate-500'>자격증</p>

                        <ul className='mt-6 space-y-3 text-slate-700 leading-relaxed text-sm'>
                            <li>
                                정보처리기능사<sup className='ml-0.5'>A</sup>
                                <span className='ml-2 text-xs text-slate-500'>(HRDK)</span>
                            </li>
                            <li>
                                정보처리산업기사
                                <span className='ml-2 text-xs text-slate-500'>(HRDK)</span>
                            </li>
                            <li>
                                정보기기운용기능사
                                <span className='ml-2 text-xs text-slate-500'>(HRDK)</span>
                            </li>
                            <li>
                                리눅스마스터 2급 / 1급
                                <span className='ml-2 text-xs text-slate-500'>(KAIT)</span>
                            </li>
                            <li>
                                AWS SAA-C03 / SAP-C02
                                <span className='ml-2 text-xs text-slate-500'>(AWS)</span>
                            </li>
                            <li>
                                CCNA
                                <span className='ml-2 text-xs text-slate-500'>(Cisco)</span>
                            </li>
                            <li>
                                CKA
                                <span className='ml-2 text-xs text-slate-500'>(CNCF)</span>
                            </li>
                        </ul>

                        <p className='mt-6 text-xs text-slate-500 leading-relaxed break-keep'>
                            위 자격증은 Null4U의 정체성이나 관련 분야와 연관성이 높은 항목 위주로 정리하였습니다.
                        </p>

                        <p className='mt-4 text-xs text-slate-500 leading-relaxed break-keep'>
                            <sup className='mr-1'>A</sup>現 프로그래밍기능사
                        </p>
                    </div>
                </div>

                <div className='mt-10 md:-mt-5.5 flex justify-end'>
                    <a
                        href='/curriculum'
                        className='group inline-flex items-center gap-2 text-sm font-medium text-slate-900 transition-colors hover:text-slate-600'
                    >
                        자세히 보기
                        <span className='transition-transform duration-300 group-hover:translate-x-1'>&rarr;</span>
                    </a>
                </div>
            </div>
        </section>
    )
}
