import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faLink, faVideo } from '@fortawesome/free-solid-svg-icons'
import { PresentationData } from '../../../data/presentations'

interface PresentationProps extends PresentationData {}

export const Presentation = (props: PresentationProps) => (
    <div className='rounded-2xl outline outline-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden'>
        {props.thumbnail && (
            <div className='w-full h-48 overflow-hidden bg-gray-100'>
                <img src={props.thumbnail} alt={props.title} className='w-full h-full object-cover' />
            </div>
        )}
        <div className='p-6 flex flex-col flex-1'>
            <div className='flex-1'>
                <div className='text-lg font-bold text-gray-800 mb-2'>{props.title}</div>
                <div className='text-sm text-gray-600 font-semibold mb-1'>{props.event}</div>
                <div className='text-sm text-gray-400 font-medium mb-3'>{props.date}</div>
                <p className='text-sm text-gray-600 leading-relaxed break-keep mb-4'>{props.description}</p>
                {props.tags && props.tags.length > 0 && (
                    <div className='flex flex-wrap gap-2 mb-4'>
                        {props.tags.map((tag, index) => (
                            <span key={index} className='text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg font-medium'>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            {(props.slidesLink || props.videoLink || props.blogLink) && (
                <div className='mt-auto pt-4 border-t border-gray-100 flex gap-3'>
                    {props.slidesLink && (
                        <a
                            href={props.slidesLink}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors duration-200 font-medium'
                        >
                            <FontAwesomeIcon icon={faFileLines} className='text-xs' />
                            <span>발표 자료</span>
                        </a>
                    )}
                    {props.videoLink && (
                        <a
                            href={props.videoLink}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors duration-200 font-medium'
                        >
                            <FontAwesomeIcon icon={faVideo} className='text-xs' />
                            <span>영상 보기</span>
                        </a>
                    )}
                    {/* {props.blogLink && (
                        <a
                            href={props.blogLink}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors duration-200 font-medium'
                        >
                            <FontAwesomeIcon icon={faBook} className='text-xs' />
                            <span>블로그 게시글</span>
                        </a>
                    )} */}
                    {props.blogLink && props.blogLink.length > 0 && (
                        <div className='flex flex-row gap-2'>
                            {props.blogLink.map((link, index) => (
                                <a
                                    key={index}
                                    href={link}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors duration-200 font-medium'
                                >
                                    <FontAwesomeIcon icon={faLink} className='text-xs' />
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
)
