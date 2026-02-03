import { Layout } from '../components/Layout'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listBoardPosts, BoardPost } from '../api/client'

export const BoardPage = () => {
    const [posts, setPosts] = useState<BoardPost[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [nextToken, setNextToken] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const pageSize = 20

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async (token?: string) => {
        try {
            if (token) {
                setLoadingMore(true)
            } else {
                setLoading(true)
            }
            const response = await listBoardPosts(pageSize, token)
            if (token) {
                setPosts((prev) => [...prev, ...response.items])
            } else {
                setPosts(response.items)
            }
            setNextToken(response.nextToken)
            setHasMore(!!response.nextToken)
        } catch (error) {
            console.error('Failed to fetch board posts:', error)
        } finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }

    const handleLoadMore = () => {
        if (nextToken && !loadingMore) {
            fetchPosts(nextToken)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ko-KR')
    }

    const filteredPosts = posts.filter((post) =>
        searchQuery ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) : true,
    )
    return (
        <Layout>
            <div className='max-w-4xl mx-auto px-4 py-6'>
                <h1 className='text-3xl md:text-4xl font-semibold mb-8'>자유게시판</h1>

                <div className='mb-8'>
                    <div className='flex flex-col sm:flex-row gap-3'>
                        <input
                            type='text'
                            placeholder='검색어를 입력하세요'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='flex-1 border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm'
                        />
                        <button className='px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium shadow-sm'>
                            검색
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className='text-center py-20 text-gray-500'>로딩 중...</div>
                ) : filteredPosts.length === 0 ? (
                    <div className='text-center py-20 text-gray-500'>등록된 게시글이 없습니다.</div>
                ) : (
                    <>
                        <div className='hidden md:block border border-gray-100 rounded-xl overflow-hidden'>
                            <div className='bg-gray-50 border-b border-gray-100'>
                                <div className='grid grid-cols-12 gap-4 p-4 text-sm font-semibold'>
                                    <div className='col-span-7'>제목</div>
                                    <div className='col-span-2 text-center'>작성자</div>
                                    <div className='col-span-2 text-center'>작성일</div>
                                    <div className='col-span-1 text-center'>조회</div>
                                </div>
                            </div>
                            <div>
                                {filteredPosts.map((post, _) => (
                                    <Link key={post.id} to={`/board/${post.id}`}>
                                        <div className='grid grid-cols-12 gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors text-sm'>
                                            <div className='col-span-7 font-medium'>{post.title}</div>
                                            <div className='col-span-2 text-center text-gray-600'>
                                                {post.anonymousName}
                                            </div>
                                            <div className='col-span-2 text-center text-gray-600'>
                                                {formatDate(post.createdAt)}
                                            </div>
                                            <div className='col-span-1 text-center text-gray-600'>{post.views}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className='md:hidden flex flex-col gap-3'>
                            {filteredPosts.map((post, _) => (
                                <Link key={post.id} to={`/board/${post.id}`}>
                                    <div className='border border-gray-100 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors'>
                                        <h3 className='font-medium text-sm mb-3'>{post.title}</h3>
                                        <div className='flex items-center justify-between text-xs text-gray-500'>
                                            <div className='flex items-center gap-3'>
                                                <span>{post.anonymousName}</span>
                                                <span>{formatDate(post.createdAt)}</span>
                                            </div>
                                            <span>조회 {post.views}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {hasMore && (
                            <div className='mt-8 flex justify-center'>
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loadingMore}
                                    className='px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed'
                                >
                                    {loadingMore ? '로딩 중...' : '더보기'}
                                </button>
                            </div>
                        )}
                    </>
                )}

                {!loading && (
                    <div className='mt-6 flex justify-end'>
                        <Link
                            to='/board/new'
                            className='px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium shadow-sm'
                        >
                            글쓰기
                        </Link>
                    </div>
                )}
            </div>
        </Layout>
    )
}
