export const Footer = () => {
    return (
        <footer className='bg-gray-50 text-black mt-auto'>
            <div className='max-w-6xl mx-auto pl-8 md:pl-4 pr-4 py-12'>
                <div className='flex flex-col md:flex-row md:justify-center items-start gap-8 md:gap-32 mb-8'>
                    <div>
                        <h3 className='font-semibold text-base mb-4'>소개</h3>
                        <ul className='space-y-2 text-sm text-gray-500'>
                            <li>
                                <a href='/about' className='hover:text-gray-700 transition-colors'>
                                    동아리 소개
                                </a>
                            </li>
                            <li>
                                <a href='/curriculum' className='hover:text-gray-700 transition-colors'>
                                    커리큘럼
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className='font-semibold text-base mb-4'>프로젝트</h3>
                        <ul className='space-y-2 text-sm text-gray-500'>
                            <li>
                                <a href='/projects' className='hover:text-gray-700 transition-colors'>
                                    프로젝트
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className='font-semibold text-base mb-4'>모집</h3>
                        <ul className='space-y-2 text-sm text-gray-500'>
                            <li>
                                <a href='/recruitment' className='hover:text-gray-700 transition-colors'>
                                    모집안내
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className='font-semibold text-base mb-4'>게시판</h3>
                        <ul className='space-y-2 text-sm text-gray-500'>
                            <li>
                                <a href='/notice' className='hover:text-gray-700 transition-colors'>
                                    공지사항
                                </a>
                            </li>
                            <li>
                                <a href='/board' className='hover:text-gray-700 transition-colors'>
                                    자유게시판
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='border-t border-gray-300 pt-6 text-center text-sm text-gray-500'>
                    © 2026 Null4U. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
