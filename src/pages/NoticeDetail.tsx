import { Layout } from '../components/Layout'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAnnouncement, Announcement } from '../api/client'
import Markdown from '../components/Markdown'

export const NoticeDetailPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [announcement, setAnnouncement] = useState<Announcement | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return

        let cancelled = false

        const fetchAnnouncement = async () => {
            try {
                setLoading(true)
                const response = await getAnnouncement(id)
                if (!cancelled) {
                    setAnnouncement(response.item)
                }
            } catch (error) {
                if (!cancelled) {
                    console.error('Failed to fetch announcement:', error)
                }
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        fetchAnnouncement()

        return () => {
            cancelled = true
        }
    }, [id])

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    const getTypeLabel = (type: string) => {
        return type === 'news' ? '소식' : '공지'
    }

    if (loading) {
        return (
            <Layout>
                <div className='max-w-4xl mx-auto px-4 py-6'>
                    <div className='text-center py-20 text-gray-500'>로딩 중...</div>
                </div>
            </Layout>
        )
    }

    if (!announcement) {
        return (
            <Layout>
                <div className='max-w-4xl mx-auto px-4 py-6'>
                    <div className='text-center py-20 text-gray-500'>게시글을 찾을 수 없습니다.</div>
                    <div className='text-center'>
                        <button
                            onClick={() => navigate('/notices')}
                            className='px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-medium'
                        >
                            목록으로
                        </button>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className='max-w-4xl mx-auto px-4 py-6'>
                <div className='bg-white rounded-xl border border-gray-100 overflow-hidden'>
                    <div className='border-b border-gray-100 p-6'>
                        <div className='flex items-center gap-2 mb-3'>
                            <span
                                className={`text-xs px-3 py-1 rounded-full ${
                                    announcement.type === 'news'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-blue-100 text-blue-700'
                                }`}
                            >
                                {getTypeLabel(announcement.type)}
                            </span>
                        </div>
                        <h1 className='text-3xl font-bold mb-4'>{announcement.title}</h1>
                        <div className='flex items-center gap-4 text-sm text-gray-600'>
                            <span>작성일: {formatDate(announcement.createdAt)}</span>
                            <span>•</span>
                            <span>조회수: {announcement.views}</span>
                            {announcement.updatedAt !== announcement.createdAt && (
                                <>
                                    <span>•</span>
                                    <span>수정일: {formatDate(announcement.updatedAt)}</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className='p-6'>
                        <div className='prose max-w-none'>
                            {announcement.content ? (
                                <Markdown content={announcement.content} />
                            ) : (
                                <div className='text-gray-500'>내용이 없습니다.</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='mt-6 flex justify-end'>
                    <button
                        onClick={() => navigate('/notices')}
                        className='px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium'
                    >
                        목록으로
                    </button>
                </div>
            </div>
        </Layout>
    )
}
