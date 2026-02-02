import { Layout } from '../components/Layout'

const projects = [
    {
        id: 1,
        title: '공산화하기',
        description: '독재체제를 기반으로 한 공산주의 이념의 동아리를 만들어갑니다',
        tech: '공산주의',
        date: '1990.01 - 1995.12',
        team: 'ㅇㄴㅇ',
        status: '완료'
    },
    {
        id: 2,
        title: '공산화하기',
        description: '독재체제를 기반으로 한 공산주의 이념의 동아리를 만들어갑니다',
        tech: '공산주의',
        date: '1990.01 - 1995.12',
        team: 'ㅇㄴㅇ',
        status: '완료'
    },
    {
        id: 3,
        title: '공산화하기',
        description: '독재체제를 기반으로 한 공산주의 이념의 동아리를 만들어갑니다',
        tech: '공산주의',
        date: '1990.01 - 1995.12',
        team: 'ㅇㄴㅇ',
        status: '완료'
    },
    {
        id: 4,
        title: '공산화하기',
        description: '독재체제를 기반으로 한 공산주의 이념의 동아리를 만들어갑니다',
        tech: '공산주의',
        date: '1990.01 - 1995.12',
        team: 'ㅇㄴㅇ',
        status: '완료'
    },
]

export const ProjectsPage = () => {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="bg-white rounded-xl p-8 animate-fadeIn">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8">프로젝트</h1>
                
                    <div className="space-y-6">
                        {projects.map(project => (
                            <div key={project.id} className="border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-0">{project.title}</h2>
                                <span className={`px-3 py-1 text-sm rounded ${
                                    project.status === '완료' 
                                        ? 'bg-gray-200 text-gray-700'
                                        : 'bg-blue-100 text-blue-700'
                                }`}>
                                    {project.status}
                                </span>
                            </div>
                            
                            <p className="text-gray-700 mb-4 text-sm md:text-base">{project.description}</p>
                            
                            <div className="grid gap-2 text-xs md:text-sm">
                                <div className="flex flex-col md:flex-row">
                                    <span className="font-semibold md:w-24 mb-1 md:mb-0">기술 스택:</span>
                                    <span className="text-gray-700">{project.tech}</span>
                                </div>
                                <div className="flex flex-col md:flex-row">
                                    <span className="font-semibold md:w-24 mb-1 md:mb-0">기간:</span>
                                    <span className="text-gray-700">{project.date}</span>
                                </div>
                                <div className="flex flex-col md:flex-row">
                                    <span className="font-semibold md:w-24 mb-1 md:mb-0">팀원:</span>
                                    <span className="text-gray-700">{project.team}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </Layout>
    )
}
