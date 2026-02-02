import { Link } from 'react-router-dom'

export const Footer = () => (
    <footer className='page-footer flex flex-col items-center justify-between pt-6 pb-6 mt-12 border-t border-gray-200 text-sm text-gray-500'>
        <div className='mb-4'>
            <ul className='flex flex-wrap justify-center gap-x-6 gap-y-2'>
                <li>
                    <Link to='/' className='hover:text-blue-500 font-semibold'>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to='/projects' className='hover:text-blue-500 font-semibold'>
                        Projects
                    </Link>
                </li>
                <li>
                    <Link to='/articles' className='hover:text-blue-500 font-semibold'>
                        Articles
                    </Link>
                </li>
                <li>
                    <Link to='/presentations' className='hover:text-blue-500 font-semibold'>
                        Presentations
                    </Link>
                </li>
                <li>
                    <Link to='/socials' className='hover:text-blue-500 font-semibold'>
                        Socials
                    </Link>
                </li>
                <li>
                    <Link to='/pledge' className='hover:text-blue-500 font-semibold'>
                        Pledge
                    </Link>
                </li>
            </ul>
        </div>

        <div className='text-center'>
            <Link to='https://github.com/yulmwu' className='hover:text-blue-500 font-semibold'>
                <p className='text-gray-400'>© 2025 yulmwu. All Rights Reserved.</p>
            </Link>
        </div>
    </footer>
)
