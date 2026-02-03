import { Layout } from '../components/Layout'
import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { listAnnouncements, Announcement } from '../api/client'

export const NoticePage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [nextToken, setNextToken] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const type = (searchParams.get('type') as 'news' | 'notice') || undefined
    const pageSize = 20

    useEffect(() => {
        setAnnouncements([])
        setNextToken(null)
        fetchAnnouncements()
    }, [type])

    const fetchAnnouncements = async (token?: string) => {
        try {
            if (token) {
                setLoadingMore(true)
            } else {
                setLoading(true)
            }
            const response = await listAnnouncements(type, pageSize, token)
            if (token) {
                setAnnouncements((prev) => [...prev, ...response.items])
            } else {
                setAnnouncements(response.items)
            }
            setNextToken(response.nextToken)
            setHasMore(!!response.nextToken)
        } catch (error) {
            console.error('Failed to fetch announcements:', error)
        } finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }

    const handleLoadMore = () => {
        if (nextToken && !loadingMore) {
            fetchAnnouncements(nextToken)
        }
    }

    const handleTypeFilter = (filterType: 'news' | 'notice' | undefined) => {
        if (filterType) {
            setSearchParams({ type: filterType })
        } else {
            setSearchParams({})
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ko-KR')
    }

    const getTypeLabel = (itemType: string) => {
        return itemType === 'news' ? '소식' : '공지'
    }

    const filteredAnnouncements = announcements.filter((announcement) =>
        searchQuery ? announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) : true,
    )
    return (
        <Layout>
            <div className='max-w-4xl mx-auto px-4 py-6'>
                <h1 className='text-3xl md:text-4xl font-semibold mb-8'>
                    {type === 'news' ? '최근 소식' : type === 'notice' ? '공지사항' : '기타'}
                </h1>

                <div className='mb-6 flex gap-2'>
                    <button
                        onClick={() => handleTypeFilter(undefined)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            !type ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        전체
                    </button>
                    <button
                        onClick={() => handleTypeFilter('news')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            type === 'news' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        소식
                    </button>
                    <button
                        onClick={() => handleTypeFilter('notice')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            type === 'notice' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        공지사항
                    </button>
                </div>

                <div className='mb-8'>
                    <div className='flex flex-col sm:flex-row gap-3'>
                        <input
                            type='text'
                            placeholder='검색어를 입력하세요'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='flex-1 border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm'
                        />
                        <button className='px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-medium shadow-sm hover:shadow-md'>
                            검색
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className='text-center py-20 text-gray-500'>로딩 중...</div>
                ) : filteredAnnouncements.length === 0 ? (
                    <div className='text-center py-20 text-gray-500'>등록된 게시글이 없습니다.</div>
                ) : (
                    <>
                        <div className='hidden md:block border border-gray-100 rounded-xl overflow-hidden'>
                            <div className='bg-gray-50 border-b border-gray-100'>
                                <div className='grid grid-cols-12 gap-4 p-4 text-sm font-semibold'>
                                    <div className='col-span-1 text-center'>구분</div>
                                    <div className='col-span-8'>제목</div>
                                    <div className='col-span-2 text-center'>작성일</div>
                                    <div className='col-span-1 text-center'>조회</div>
                                </div>
                            </div>
                            <div>
                                {filteredAnnouncements.map((announcement, _) => (
                                    <Link key={announcement.id} to={`/notices/${announcement.id}`}>
                                        <div className='grid grid-cols-12 gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors text-sm'>
                                            <div className='col-span-1 text-center'>
                                                <span
                                                    className={`text-xs px-2 py-1 rounded-full ${
                                                        announcement.type === 'news'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-blue-100 text-blue-700'
                                                    }`}
                                                >
                                                    {getTypeLabel(announcement.type)}
                                                </span>
                                            </div>
                                            <div className='col-span-8 font-medium'>{announcement.title}</div>
                                            <div className='col-span-2 text-center text-gray-600'>
                                                {formatDate(announcement.createdAt)}
                                            </div>
                                            <div className='col-span-1 text-center text-gray-600'>
                                                {announcement.views}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className='md:hidden flex flex-col gap-3'>
                            {filteredAnnouncements.map((announcement, _) => (
                                <Link key={announcement.id} to={`/notices/${announcement.id}`}>
                                    <div className='border border-gray-100 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors'>
                                        <div className='flex items-start justify-between mb-2'>
                                            <span
                                                className={`text-xs px-2 py-1 rounded-full ${
                                                    announcement.type === 'news'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                }`}
                                            >
                                                {getTypeLabel(announcement.type)}
                                            </span>
                                        </div>
                                        <h3 className='font-medium text-sm mb-3'>{announcement.title}</h3>
                                        <div className='flex items-center justify-between text-xs text-gray-500'>
                                            <span>{formatDate(announcement.createdAt)}</span>
                                            <span>조회 {announcement.views}</span>
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
            </div>
        </Layout>
    )
}
