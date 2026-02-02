import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface CardContainerContent {
    logo?: string
    logoColor?: string
    title: string
    description?: string
    period: string
}

interface CardContainerProps {
    title: string
    icon: IconDefinition
    contents: CardContainerContent[]
    className?: string
}

export const CardContainer = (props: CardContainerProps) => (
    <div className={`rounded-2xl outline outline-gray-100 bg-white shadow-sm mb-5 ${props.className}`}>
        <div className='p-7 pb-1'>
            <div className='flex items-center mb-5'>
                <div className='text-sm text-gray-400'>
                    <FontAwesomeIcon icon={props.icon} />
                </div>
                <div className='text-sm text-gray-600 font-semibold pl-3'>{props.title}</div>
            </div>
            <div className='space-y-3 mb-2'>
                <div className='space-y-3'>
                    {props.contents.map((content, index) => (
                        <div
                            key={index}
                            className='flex flex-col relative pb-4 cursor-default hover:bg-gray-50 transition-colors duration-200 rounded-lg p-3 -ml-3'
                        >
                            <div className='flex items-start'>
                                {content.logo ? (
                                    <img
                                        src={content.logo}
                                        alt={content.title}
                                        className='h-10 w-10 rounded-full outline outline-white shadow-md flex-shrink-0 mr-2'
                                    />
                                ) : content.logoColor ? (
                                    <div
                                        className='h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center mr-2'
                                        style={{ backgroundColor: content.logoColor ?? '#EDEDED' }}
                                    >
                                        <FontAwesomeIcon icon={props.icon} className='text-white text-sm' />
                                    </div>
                                ) : null}
                                <div className='pl-2 flex-1'>
                                    <p className='block sm:hidden text-sm text-gray-400 mb-1 font-medium'>
                                        {content.period}
                                    </p>
                                    <div className='text-base font-bold text-gray-700'>{content.title}</div>
                                    {content.description && (
                                        <p className='text-sm text-gray-500 mt-1 break-keep'>{content.description}</p>
                                    )}
                                </div>
                            </div>
                            <p className='hidden sm:block absolute top-3 right-3 text-sm text-gray-400 font-medium'>
                                {content.period}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
)
