import { Layout } from '../components/Layout'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useEffect, useState } from 'react'
import { listAnnouncements, Announcement } from '../api/client'
import { Link } from 'react-router-dom'

export const Home = () => {
    const [newsData, setNewsData] = useState<Announcement[]>([])
    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [newsResponse, noticesResponse] = await Promise.all([
                    listAnnouncements('news', 10),
                    listAnnouncements('notice', 3),
                ])
                setNewsData(newsResponse.items)
                setAnnouncements(noticesResponse.items)
            } catch (error) {
                console.error('Failed to fetch announcements:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date
            .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
            .replace(/\. /g, '.')
            .replace('.', '')
    }

    const getBadgeText = (type: string) => {
        return type === 'notice' ? '공지' : '소식'
    }

    return (
        <Layout>
            <div className='max-w-6xl mx-auto px-4 py-6'>
                <section className='max-w-sm md:max-w-6xl mx-auto py-16 text-center bg-white rounded-xl mb-6'>
                    <h1 className='hero-title mb-6 text-6xl md:text-7xl font-extrabold'>Null4U</h1>
                    <p className='text-lg text-gray-600 mb-6 break-keep'>
                        세명컴퓨터고등학교 스마트보안솔루션과{' '}
                        <span className='font-medium'>클라우드 컴퓨팅 · 개발 · DevSecOps</span> 전공 심화 동아리
                    </p>
                </section>

                <section className='py-12 bg-white rounded-xl mb-6'>
                    <h2 className='text-3xl font-semibold text-center mb-10'>주요 활동</h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 px-4'>
                        <div className='border border-gray-100 rounded-xl p-8 text-center hover:shadow-md transition-all'>
                            <div className='text-4xl mb-4'>ㅇㅇ</div>
                            <h3 className='text-lg font-semibold mb-3'>대충 제목</h3>
                            <p className='text-gray-600 text-sm leading-relaxed'>
                                대충 내용대충 내용대충 내용대충 내용
                            </p>
                        </div>
                        <div className='border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-all'>
                            <div className='text-3xl mb-3'>ㄴㄴ</div>
                            <h3 className='text-base font-semibold mb-2'>대충 내용</h3>
                            <p className='text-gray-700 text-sm'>대충 내용대충 내용대충 내용</p>
                        </div>
                        <div className='border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-all'>
                            <div className='text-3xl mb-3'>ㄱㄱ</div>
                            <h3 className='text-base font-semibold mb-2'>대충 내용대충 내용대충 내용</h3>
                            <p className='text-gray-700 text-sm'>대충 내용대충 내용대충 내용</p>
                        </div>
                    </div>
                </section>

                <section className='py-12 mb-6'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-start'>
                        <div className='bg-white rounded-xl p-6 shadow-sm h-fit'>
                            <div className='flex items-center justify-between mb-6'>
                                <h2 className='text-2xl font-semibold'>최근 소식</h2>
                                <Link to='/notices?type=news' className='text-sm text-gray-500 hover:text-gray-700'>
                                    최근 10개만 표시됩니다. 더보기
                                </Link>
                            </div>
                            {loading ? (
                                <div className='text-center py-12 text-gray-500'>로딩 중...</div>
                            ) : newsData.length === 0 ? (
                                <div className='text-center py-12 text-gray-500'>등록된 소식이 없습니다.</div>
                            ) : (
                                <div className='relative'>
                                    <Swiper
                                        modules={[Pagination, Autoplay]}
                                        spaceBetween={16}
                                        slidesPerView={1}
                                        slidesPerGroup={1}
                                        pagination={{ clickable: true }}
                                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                                        breakpoints={{
                                            640: {
                                                slidesPerView: 2,
                                                slidesPerGroup: 2,
                                            },
                                        }}
                                        className='news-swiper'
                                    >
                                        {newsData.map((news) => (
                                            <SwiperSlide key={news.id}>
                                                <Link to={`/notices/${news.id}`}>
                                                    <div className='bg-white border border-gray-200 rounded-lg p-5 h-[240px] flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow'>
                                                        <div>
                                                            <h3 className='text-lg font-bold mb-2 text-gray-800 line-clamp-2'>
                                                                {news.title}
                                                            </h3>
                                                            <p className='text-gray-600 text-sm leading-relaxed line-clamp-3'>
                                                                {news.description}
                                                            </p>
                                                        </div>
                                                        <div className='flex justify-between items-center pt-3 border-t border-gray-200'>
                                                            <span className='text-xs text-gray-500'>
                                                                {formatDate(news.createdAt)}
                                                            </span>
                                                            <span className='text-xs text-gray-400'>
                                                                조회 {news.views}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            )}
                            <style>{`
                                .news-swiper {
                                    padding-bottom: 45px;
                                }
                                .news-swiper .swiper-pagination {
                                    bottom: 10px;
                                }
                                .news-swiper .swiper-pagination-bullet {
                                    background: #3b82f6;
                                    width: 8px;
                                    height: 8px;
                                    opacity: 0.3;
                                }
                                .news-swiper .swiper-pagination-bullet-active {
                                    opacity: 1;
                                }
                            `}</style>
                        </div>

                        <div className='bg-white rounded-xl p-6 shadow-sm h-fit'>
                            <div className='flex items-center justify-between mb-6'>
                                <h2 className='text-2xl font-semibold'>공지사항</h2>
                                <Link to='/notices?type=notice' className='text-sm text-gray-500 hover:text-gray-700'>
                                    최근 3개만 표시됩니다. 더보기
                                </Link>
                            </div>
                            {loading ? (
                                <div className='text-center py-12 text-gray-500'>로딩 중...</div>
                            ) : announcements.length === 0 ? (
                                <div className='text-center py-12 text-gray-500'>등록된 공지사항이 없습니다.</div>
                            ) : (
                                <div className='grid gap-4'>
                                    {announcements.map((announcement) => (
                                        <Link key={announcement.id} to={`/notices/${announcement.id}`}>
                                            <div className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group'>
                                                <div className='flex items-start justify-between mb-2'>
                                                    <h3 className='text-base font-semibold text-gray-800 transition-colors flex-1'>
                                                        {announcement.title}
                                                    </h3>
                                                    <span className='text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2 bg-blue-100 text-blue-700'>
                                                        {getBadgeText(announcement.type)}
                                                    </span>
                                                </div>
                                                <p className='text-sm text-gray-600 mb-2 line-clamp-2'>
                                                    {announcement.description}
                                                </p>
                                                <div className='flex justify-between items-center'>
                                                    <span className='text-xs text-gray-400'>
                                                        {formatDate(announcement.createdAt)}
                                                    </span>
                                                    <span className='text-xs text-gray-400'>
                                                        조회 {announcement.views}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section className='py-16 text-center bg-white rounded-xl'>
                    <h2 className='text-3xl font-semibold mb-4'>가입하기</h2>
                    <p className='text-gray-600 mb-8'>함께 나아갈 동아리원을 모집합니다.</p>
                    <div className='flex flex-col justify-center items-center gap-4'>
                        <button className='w-64 px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg'>
                            2026학년도 1학기 지원 안내
                        </button>
                        <button className='w-64 px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg'>
                            모집안내
                        </button>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
