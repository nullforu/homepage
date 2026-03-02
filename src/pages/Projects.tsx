import { Layout } from '../components/Layout'

export type ProjectStatus = 'planning' | 'progress' | 'operating' | 'completed' | 'longterm'

export interface StatusMapEntry {
    bgColor: string
    textColor: string
    label: string
}

export const statusMap: Record<ProjectStatus, StatusMapEntry> = {
    planning: { bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', label: '계획 중' },
    progress: { bgColor: 'bg-blue-100/50', textColor: 'text-blue-800', label: '진행 중' },
    operating: { bgColor: 'bg-green-100', textColor: 'text-green-800', label: '운영 중' },
    completed: { bgColor: 'bg-gray-100', textColor: 'text-gray-800', label: '완료' },
    longterm: { bgColor: 'bg-gray-100', textColor: 'text-gray-800', label: '장기 프로젝트' },
}

export interface Project {
    id: number
    title: string
    description: string
    maintainer: string
    status: ProjectStatus
    tags?: string[]
    link?: string
    subProjects?: Omit<Project, 'subProjects'>[]
}

export const projects: Project[] = [
    {
        id: 1,
        title: '스마트보안솔루션과 포털',
        description: '학과와 관련된 다양한 자료와 정보를 제공하는 포털 사이트',
        maintainer: 'Null4U',
        status: 'operating',
        tags: ['Apache', 'WordPress', 'AWS'],
        link: 'https://smc-secu.net',
    },
    {
        id: 2,
        title: 'SMCTF',
        description: 'CTF 대회 개최 및 운영을 위한 플랫폼 개발',
        maintainer: '김준영',
        status: 'progress',
        tags: ['CTF', 'Project SMCTF', 'SCA'],
        link: 'https://ctf.null4u.cloud/smctf',
        subProjects: [
            {
                id: 301,
                title: 'SMCTF Backend',
                description: 'SMCTF REST API 백엔드 서버',
                maintainer: '김준영',
                status: 'progress',
                tags: ['Backend', 'Go', 'Gin', 'Bun ORM', 'PostgreSQL', 'Redis'],
                link: 'https://github.com/nullforu/smctf',
            },
            {
                id: 302,
                title: 'SMCTF Frontend',
                description: 'SMCTF 프론트엔드',
                maintainer: '김준영',
                status: 'progress',
                tags: ['Frontend', 'React', 'TypeScript', 'TailwindCSS', 'CSR'],
                link: 'https://github.com/nullforu/smctfe',
            },
            {
                id: 303,
                title: 'Container Provisioner',
                description: '격리된 문제 환경을 위한 컨테이너 프로비저닝 시스템',
                maintainer: '김준영',
                status: 'completed',
                tags: ['Container', 'Docker', 'Kubernetes', 'Go', 'Gin'],
                link: 'https://github.com/nullforu/container-provisioner',
            },
            {
                id: 304,
                title: 'SMCTF Infrastructure',
                description: 'CTF 대회 운영을 위한 인프라 구축 및 관리',
                maintainer: '김준영',
                status: 'completed',
                tags: ['Infra', 'AWS', 'Terraform', 'Kubernetes', 'Helm', 'IaC'],
                link: 'https://github.com/nullforu/smctf',
            },
        ],
    },
    {
        id: 3,
        title: '세소리(Sesori)',
        description: '세명컴퓨터고등학교 학생들을 위한 커뮤니티 웹페이지',
        maintainer: '김준영',
        status: 'planning',
        tags: ['Community', 'NestJS', 'TypeScript', 'Next.js', 'TailwindCSS'],
        link: 'https://github.com/nullforu/sesori',
    },
    {
        id: 4,
        title: 'Null4U 홈페이지',
        description: 'Null4U 동아리 공식 홈페이지 (현 홈페이지)',
        maintainer: 'Null4U',
        status: 'completed',
        tags: ['Frontend', 'React', 'TypeScript', 'TailwindCSS', 'Vite'],
        link: 'https://null4u.cloud',
        subProjects: [
            {
                id: 401,
                title: 'Null4U 홍보용 페이지',
                description: '동아리 홍보를 위한 컴퓨팅 컨셉의 홍보 페이지 제작',
                maintainer: 'Null4U',
                status: 'completed',
                tags: ['Frontend', 'React', 'TypeScript', 'TailwindCSS', 'Vite'],
                link: 'https://null4u.swua.kr',
            },
        ],
    },
    {
        id: 1001,
        title: '전국/지방기능경기대회 참가',
        description: '동아리원들의 기능경기대회 참가를 위한 준비 및 지원',
        maintainer: '학과',
        tags: ['대회', '기능경기대회', '전국대회', '지방대회', '클라우드'],
        status: 'longterm',
    },
]

export const ProjectsPage = () => {
    return (
        <Layout>
            <div className='max-w-4xl mx-auto px-4 py-6 mb-12'>
                <h1 className='text-3xl md:text-4xl font-semibold mb-8'>프로젝트</h1>

                <div className='space-y-6'>
                    {projects.map((project) => (
                        <div key={project.id}>
                            <div
                                className={`border border-gray-100 rounded-xl p-6 ${project.link ? 'cursor-pointer' : ''}`}
                                onClick={() => {
                                    if (project.link) window.open(project.link, '_blank')
                                }}
                            >
                                <div className='flex flex-col md:flex-row md:justify-between md:items-start mb-4'>
                                    <h2 className='text-xl md:text-2xl font-semibold mb-2 md:mb-0'>{project.title}</h2>
                                    <span
                                        className={`px-3 py-1 text-sm rounded ${statusMap[project.status].bgColor} ${statusMap[project.status].textColor}`}
                                    >
                                        {statusMap[project.status].label}
                                    </span>
                                </div>

                                <p className='text-gray-700 mb-4 text-sm md:text-base'>{project.description}</p>

                                {project.tags && (
                                    <div className='flex flex-wrap gap-2 mb-4'>
                                        {project.tags.map((tech) => (
                                            <span
                                                key={tech}
                                                className='px-2.5 py-1 text-xs rounded-md bg-gray-50 text-gray-700 border border-gray-100 hover:bg-gray-100 transition-colors'
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className='grid gap-2 text-xs md:text-sm'>
                                    <div className='flex flex-col md:flex-row'>
                                        <span className='font-semibold md:w-24 mb-1 md:mb-0'>메인테이너</span>
                                        <span className='text-gray-700'>{project.maintainer}</span>
                                    </div>
                                </div>
                            </div>

                            {project.subProjects && (
                                <div className='py-4 space-y-4'>
                                    {project.subProjects.map((sub) => (
                                        <div
                                            key={sub.id}
                                            className={`bg-gray-50 border border-gray-100 border-l-0 rounded-xl p-4 text-sm ${sub.link ? 'cursor-pointer' : ''}`}
                                            onClick={() => {
                                                if (sub.link) window.open(sub.link, '_blank')
                                            }}
                                        >
                                            <div className='flex justify-between items-start mb-2'>
                                                <h3 className='font-semibold'>{sub.title}</h3>
                                                <span
                                                    className={`px-2 py-0.5 text-xs rounded ${statusMap[sub.status].bgColor} ${statusMap[sub.status].textColor}`}
                                                >
                                                    {statusMap[sub.status].label}
                                                </span>
                                            </div>

                                            <p className='text-gray-600 mb-2'>{sub.description}</p>

                                            {sub.tags && (
                                                <div className='flex flex-wrap gap-2 mb-3'>
                                                    {sub.tags.map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className='px-2 py-0.5 text-xs rounded-md bg-white border border-gray-200 text-gray-600'
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <div className='grid gap-1 text-xs'>
                                                <div className='flex flex-col md:flex-row'>
                                                    <span className='font-semibold md:w-20 mb-1 md:mb-0'>
                                                        메인테이너
                                                    </span>
                                                    <span className='text-gray-700'>{sub.maintainer}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}
