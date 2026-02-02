import { faCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { techStacks } from '../../data/techs'

export const Stacks = () => (
    <div className='rounded-2xl outline outline-gray-100 bg-white shadow-sm'>
        <div className='p-7'>
            <div className='flex items-center mb-6'>
                <div className='text-sm text-gray-400'>
                    <FontAwesomeIcon icon={faCode} />
                </div>
                <div className='text-sm text-gray-600 font-semibold pl-3'>Tech Stacks</div>
                <div className='text-sm text-gray-400 font-medium pl-2'>(Some of them)</div>
            </div>
            <div className='space-y-6'>
                {Object.entries(techStacks).map(([category, techs]) => (
                    <div key={category}>
                        <h3 className='text-base text-gray-700 font-bold mb-3 flex items-center gap-2'>
                            <span className='w-1 h-4 bg-primary rounded-full'></span>
                            {category}
                            <span className='text-sm text-gray-400 font-medium'>({techs.length})</span>
                        </h3>
                        <div className='flex gap-2 flex-wrap'>
                            {techs.map((tech) => (
                                <span
                                    key={tech}
                                    className='inline-block bg-gray-50 hover:bg-gray-100 ml-2 px-3 py-1.5 rounded-lg text-sm text-gray-700 transition-colors duration-200 cursor-default border border-gray-100 hover:border-gray-200'
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)
