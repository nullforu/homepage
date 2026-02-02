import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { NavBar } from '../components/NavBar'
import Markdown from '../components/Markdown'
import { pledgeContent } from '../data/pledges'

export const PledgePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='page-content'>
            <NavBar active='pledge' />

            <div className='content-wrapper'>
                <div className='pt-15'>
                    <div className='mb-8'>
                        <img src='/other/banner.png' alt='배너' className='w-full' />
                    </div>

                    <div className='max-w-4xl mx-auto'>
                        <div className='flex justify-center mb-12'>
                            <Link
                                to='/'
                                className='px-8 py-2 text-sm border-2 border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300'
                            >
                                후보자 약력 확인하기
                            </Link>
                        </div>

                        <div className='prose prose-lg max-w-none pledge-content'>
                            <Markdown content={pledgeContent} />
                        </div>

                        <div className='mt-20 mb-8'>
                            <img
                                src='/other/poster.png'
                                alt='포스터'
                                className='w-full max-w-2xl mx-auto rounded-lg shadow-md'
                            />
                        </div>
                    </div>

                    <div className='pt-20'>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}
