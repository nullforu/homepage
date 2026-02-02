import { Link } from 'react-router-dom'

export const NotFound = () => (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-4'>
        <div className='text-center'>
            <h1 className='text-9xl font-bold text-gray-800'>404</h1>
            <h2 className='text-2xl font-semibold text-gray-700 mt-4'>페이지를 찾을 수 없습니다.</h2>
            <Link
                to='/'
                className='inline-block mt-6 px-10 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition duration-300'
            >
                홈으로 이동
            </Link>
        </div>
    </div>
)
