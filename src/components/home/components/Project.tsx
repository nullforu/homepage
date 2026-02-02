import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

interface ProjectProps {
    isDetailPage?: boolean
    logo?: string
    title: string
    description: string
    period: string
    link: string
    github: string
    tags?: string[]
    detailTags?: string[]
    openLinkWithNewTab?: boolean
}

export const Project = (props: ProjectProps) => (
    <Link to={props.github} target='_blank' rel='noopener noreferrer'>
        <div className='rounded-2xl outline outline-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full cursor'>
            <div className='p-6 flex flex-col flex-1'>
                <a className='no-underline flex flex-col flex-1'>
                    {props.logo && (
                        <div className='w-10 h-10 mb-3 flex-shrink-0'>
                            <img src={props.logo} alt='logo' className='w-full h-full object-contain' />
                        </div>
                    )}
                    <div className='text-lg font-bold text-gray-800 mb-2'>{props.title}</div>
                    <div className='text-xs text-gray-500 mb-3 font-medium'>{props.period}</div>
                    <p className='text-sm text-gray-600 leading-relaxed break-keep mb-4 flex-1'>{props.description}</p>
                    {props.tags && (
                        <div className='flex flex-wrap gap-2 mb-4'>
                            {((props.isDetailPage ? props.detailTags : props.tags) ?? []).map((tag, index) => (
                                <span
                                    key={index}
                                    className='text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg font-medium'
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </a>
                <div className='mt-auto pt-3 border-t border-gray-100'>
                    <Link
                        to={props.github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors duration-200 font-medium'
                    >
                        <FontAwesomeIcon icon={faLink} className='text-xs' />
                        <span>Github</span>
                    </Link>
                </div>
            </div>
        </div>
    </Link>
)
