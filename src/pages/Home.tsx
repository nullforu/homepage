import { Layout } from '../components/Layout'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useEffect, useState } from 'react'
import { listAnnouncements, Announcement } from '../api/client'
import { Link } from 'react-router-dom'

const techStacks = [
    {
        name: 'DevSecOps',
        description: '개발, 운영 통합 및 CI/CD 파이프라인 구축, 보안/정책 자동화',
    },
    {
        name: 'Web Development',
        description: '프론트엔드 및 백엔드를 포함한 풀스택 웹 애플리케이션 개발',
    },
    {
        name: 'Programming',
        description: 'Python, JavaScript, TypeScript, Go 등 다양한 프로그래밍 언어 활용',
    },
    {
        name: 'Cloud Computing',
        description: 'AWS 등 주요 클라우드 플랫폼(벤더) 활용 및 관리',
    },
    {
        name: 'Containerization & Orchestration',
        description: 'Docker, Kubernetes 등 컨테이너화 및 오케스트레이션 기술 활용',
    },
    {
        name: 'Collaborations',
        description: '협업 중심의 프로젝트를 통한 실무 능력 강화',
    },
    {
        name: 'Cybersecurity',
        description: '시스템 및 네트워크 보안, 침투 테스트, 취약점 분석',
    },
]

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
                    <h2 className='text-3xl font-semibold text-center mb-10'>주요 분야/직무</h2>
                    <div className='px-4'>
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={24}
                            slidesPerView={1.7}
                            slidesPerGroup={1}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 2000, disableOnInteraction: false }}
                            breakpoints={{
                                800: {
                                    slidesPerView: 2.2,
                                    slidesPerGroup: 1,
                                },
                                1024: {
                                    slidesPerView: 3.5,
                                    slidesPerGroup: 1,
                                },
                                1280: {
                                    slidesPerView: 4.5,
                                    slidesPerGroup: 1,
                                },
                            }}
                            className='role-swiper cursor-grab'
                        >
                            {techStacks.map((stack, index) => (
                                <SwiperSlide key={index}>
                                    <div className='border border-gray-100 rounded-xl p-8 text-center h-[240px] flex flex-col justify-center break-keep'>
                                        <h3 className='text-lg font-semibold mb-3'>{stack.name}</h3>
                                        <p className='text-gray-600 text-sm leading-relaxed'>{stack.description}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <style>{`
                        .role-swiper {
                            padding-bottom: 45px;
                        }
                        .role-swiper .swiper-pagination {
                            bottom: 10px;
                        }
                        .role-swiper .swiper-pagination-bullet {
                            background: #3b82f6;
                            width: 8px;
                            height: 8px;
                            opacity: 0.3;
                        }
                        .role-swiper .swiper-pagination-bullet-active {
                            opacity: 1;
                        }
                    `}</style>
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
                                        slidesPerView={1.7}
                                        slidesPerGroup={1}
                                        pagination={{ clickable: true }}
                                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                                        breakpoints={{
                                            640: {
                                                slidesPerView: 2.5,
                                                slidesPerGroup: 1,
                                            },
                                        }}
                                        className='news-swiper'
                                    >
                                        {newsData.map((news) => (
                                            <SwiperSlide key={news.id}>
                                                <Link to={`/notices/${news.id}`}>
                                                    <div className='bg-white border border-gray-200 rounded-lg p-5 h-[240px] flex flex-col justify-between cursor-pointer'>
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
                                            <div className='border border-gray-200 rounded-lg p-4 cursor-pointer group'>
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
                        <a
                            href='/recruitment'
                            className='w-64 px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 hover:-translate-y-0.5 transition-all duration-300'
                        >
                            모집안내
                        </a>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
