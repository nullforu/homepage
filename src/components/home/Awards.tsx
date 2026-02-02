import { faTrophy, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { awards } from '../../data/histories'
import { useState, useRef } from 'react'

export const Awards = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    const fullRef = useRef<HTMLDivElement>(null)

    const importantAwards = awards.filter((award) => award.important)
    const otherAwards = awards.filter((award) => !award.important)

    return (
        <div className='rounded-2xl outline outline-gray-100 bg-white shadow-sm'>
            <div className='p-7'>
                <div className='flex items-center mb-7'>
                    <div className='text-sm text-gray-400'>
                        <FontAwesomeIcon icon={faTrophy} />
                    </div>
                    <div className='text-sm text-gray-600 font-semibold pl-3'>Awards</div>
                </div>
                <div className='space-y-2'>
                    <div>
                        {importantAwards.map((award, index) => (
                            <div
                                key={index}
                                className='flex flex-col md:flex-row md:items-center md:justify-between p-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg cursor-default border-l-3 border-transparent hover:border-primary'
                            >
                                <div className='flex items-start gap-4 flex-1'>
                                    <div className='flex-1'>
                                        <div className='flex items-center gap-1 flex-wrap mb-1'>
                                            <h3 className='text-base font-bold text-gray-700 whitespace-pre-line xl:truncate'>
                                                {award.title}
                                            </h3>
                                            {award.rank && (
                                                <span className='inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wide'>
                                                    {award.rank}
                                                </span>
                                            )}
                                        </div>
                                        <p className='text-sm text-gray-500 mt-1'>{award.organization}</p>
                                        <div className='text-sm text-gray-400 font-medium mt-2 md:hidden'>
                                            {award.date}
                                        </div>
                                    </div>
                                </div>
                                <div className='hidden md:block text-sm text-gray-400 font-medium whitespace-nowrap ml-4'>
                                    {award.date}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        ref={fullRef}
                        className='transition-all duration-500 ease-in-out overflow-hidden'
                        style={{
                            maxHeight: isExpanded ? `${fullRef.current?.scrollHeight || 2000}px` : '0px',
                            opacity: isExpanded ? 1 : 0,
                        }}
                    >
                        {otherAwards.map((award, index) => (
                            <div
                                key={index}
                                className='flex flex-col md:flex-row md:items-center md:justify-between p-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg cursor-default border-l-3 border-transparent hover:border-primary'
                            >
                                <div className='flex items-start gap-4 flex-1'>
                                    <div className='flex-1'>
                                        <div className='flex items-center gap-1 flex-wrap mb-1'>
                                            <h3 className='text-base font-bold text-gray-700 whitespace-pre-line xl:truncate'>
                                                {award.title}
                                            </h3>
                                            {award.rank && (
                                                <span className='inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wide'>
                                                    {award.rank}
                                                </span>
                                            )}
                                        </div>
                                        <p className='text-sm text-gray-500 mt-1'>{award.organization}</p>
                                        <div className='text-sm text-gray-400 font-medium mt-2 md:hidden'>
                                            {award.date}
                                        </div>
                                    </div>
                                </div>
                                <div className='hidden md:block text-sm text-gray-400 font-medium whitespace-nowrap ml-4'>
                                    {award.date}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {otherAwards.length > 0 && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className='w-full mt-4 py-3 px-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-700 cursor-pointer'
                    >
                        {isExpanded ? (
                            <>
                                <span>접기</span>
                                <FontAwesomeIcon icon={faChevronUp} className='text-xs' />
                            </>
                        ) : (
                            <>
                                <span>전체 보기 (+{otherAwards.length}개)</span>
                                <FontAwesomeIcon icon={faChevronDown} className='text-xs' />
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    )
}
