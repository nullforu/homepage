import { Layout } from '../components/Layout'

const projects = [
    {
        id: 1,
        title: '세소리(Sesori)',
        description: '세명컴퓨터고등학교 학생들을 위한 커뮤니티 웹페이지',
        maintainer: '김준영',
        status: '진행 중',
        statusColor: ['bg-blue-100', 'text-blue-700'],
        link: 'https://github.com/nullforu/sesori',
    },
    {
        id: 2,
        title: '스마트보안솔루션과 포털',
        description: '학과와 관련된 다양한 자료와 정보를 제공하는 포털 사이트',
        maintainer: 'Null4U',
        status: '운영 중',
        statusColor: ['bg-green-100', 'text-green-700'],
        link: 'https://smc-secu.net',
    },
    {
        id: 3,
        title: 'SMCTF',
        description: 'CTF 대회 개최 및 운영을 위한 플랫폼 개발',
        maintainer: '김준영',
        status: '진행 중',
        statusColor: ['bg-blue-100', 'text-blue-700'],
        link: 'https://github.com/nullforu/smctf',
    },
    {
        id: 4,
        title: 'Null4U 홈페이지',
        description: 'Null4U 동아리의 공식 홈페이지',
        maintainer: 'Null4U',
        status: '진행 중',
        statusColor: ['bg-blue-100', 'text-blue-700'],
        link: 'https://null4u.cloud',
    },
    {
        id: 5,
        title: 'Null4U 홍보용 페이지',
        description: '동아리 홍보를 위한 컴퓨팅 컨셉의 홍보 페이지 제작',
        maintainer: 'Null4U',
        status: '완료',
        statusColor: ['bg-gray-200', 'text-gray-700'],
        link: 'https://null4u.swua.kr',
    },
    {
        id: 1001,
        title: '전국/지방기능경기대회 참가',
        description: '동아리원들의 기능경기대회 참가를 위한 준비 및 지원',
        maintainer: '학과',
        status: '장기 계획',
        statusColor: ['bg-yellow-100', 'text-yellow-700'],
    },
]

export const ProjectsPage = () => {
    return (
        <Layout>
            <div className='max-w-4xl mx-auto px-4 py-6 mb-12'>
                <h1 className='text-3xl md:text-4xl font-semibold mb-8'>프로젝트</h1>

                <div className='space-y-6'>
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className={`border border-gray-100 rounded-xl p-6 ${project.link ? 'cursor-pointer' : ''}`}
                            onClick={() => {
                                if (project.link) window.open(project.link, '_blank')
                            }}
                        >
                            <div className='flex flex-col md:flex-row md:justify-between md:items-start mb-4'>
                                <h2 className='text-xl md:text-2xl font-semibold mb-2 md:mb-0'>{project.title}</h2>
                                <span className={`px-3 py-1 text-sm rounded ${project.statusColor.join(' ')}`}>
                                    {project.status}
                                </span>
                            </div>

                            <p className='text-gray-700 mb-4 text-sm md:text-base'>{project.description}</p>

                            <div className='grid gap-2 text-xs md:text-sm'>
                                <div className='flex flex-col md:flex-row'>
                                    <span className='font-semibold md:w-24 mb-1 md:mb-0'>메인테이너: </span>
                                    <span className='text-gray-700'>{project.maintainer}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}
