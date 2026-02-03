import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'

export const NotFound = () => (
    <Layout>
        <div className='max-w-4xl mx-auto text-center py-20'>
            <h1 className='text-6xl font-semibold mb-4'>404</h1>
            <p className='text-xl text-gray-600 mb-8'>페이지를 찾을 수 없습니다.</p>
            <Link to='/' className='inline-block px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700'>
                홈으로 돌아가기
            </Link>
        </div>
    </Layout>
)
