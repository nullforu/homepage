import { Project } from './components/Project'
import { projects } from '../../data/projects'
import { Link } from 'react-router-dom'

interface ProjectsProps {
    maxProjects?: number
}

export const Projects = ({ maxProjects }: ProjectsProps) => (
    <div>
        <h2 className='text-2xl font-bold text-gray-800 mb-6'>Projects</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {projects.slice(0, maxProjects).map((project, index) => (
                <Project
                    key={index}
                    logo={project.logo}
                    title={project.title}
                    description={project.description}
                    period={project.period}
                    link={project.link}
                    github={project.github}
                    tags={project.tags}
                    detailTags={project.detailTags}
                />
            ))}
        </div>
        {maxProjects && projects.length > maxProjects ? (
            <Link
                to='/projects'
                className='w-full mt-8 py-3 px-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-700'
            >
                <span>더 보기 (+{projects.length - maxProjects}개)</span>
            </Link>
        ) : (
            <a
                href='https://github.com/yulmwu'
                className='w-full mt-8 py-3 px-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-700'
                target='_blank'
                rel='noopener noreferrer'
            >
                <span>Github에서 더 보기</span>
            </a>
        )}
    </div>
)
