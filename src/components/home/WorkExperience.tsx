import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { workExperience, WorkExperienceContent } from '../../data/histories'

export const WorkExperience = () => (
    <div className='rounded-2xl outline outline-gray-100 bg-white shadow-sm'>
        <div className='p-7 pb-1'>
            <div className='flex items-center mb-5'>
                <div className='text-sm text-gray-400'>
                    <FontAwesomeIcon icon={faBriefcase} />
                </div>
                <div className='text-sm text-gray-600 font-semibold pl-3'>Career / Work Experience</div>
            </div>
            <div className='space-y-3 mb-2'>
                {workExperience.map((item: WorkExperienceContent, index: number) => (
                    <div
                        key={index}
                        className='flex flex-col relative pb-4 cursor-default hover:bg-gray-50 transition-colors duration-200 rounded-lg p-3 -ml-3'
                    >
                        <div className='flex items-start'>
                            {item.logo ? (
                                <img
                                    src={item.logo}
                                    alt={item.organization}
                                    className='h-10 w-10 rounded-full outline outline-white shadow-md flex-shrink-0'
                                />
                            ) : item.logoColor ? (
                                <div
                                    className='h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center'
                                    style={{ backgroundColor: item.logoColor ?? '#EDEDED' }}
                                >
                                    <FontAwesomeIcon icon={faBriefcase} className='text-white text-sm' />
                                </div>
                            ) : null}
                            <div className='pl-4 flex-1'>
                                <p className='block sm:hidden text-sm text-gray-400 mb-1 font-medium'>{item.period}</p>
                                <div className='text-base font-bold text-gray-700'>{item.organization}</div>
                                <div className='text-sm font-semibold text-gray-600 mt-0.5'>{item.position}</div>
                                {item.description && (
                                    <p className='text-sm text-gray-500 mt-2 break-keep leading-relaxed'>
                                        {item.description}
                                    </p>
                                )}
                                {item.skills && item.skills.length > 0 && (
                                    <div className='flex flex-wrap gap-2 mt-3'>
                                        {item.skills.map((skill: string, skillIndex: number) => (
                                            <span
                                                key={skillIndex}
                                                className='inline-block bg-gray-100 px-2.5 py-1 rounded-lg text-xs text-gray-600 font-medium'
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className='hidden sm:block absolute top-3 right-3 text-sm text-gray-400 font-medium'>
                            {item.period}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </div>
)
