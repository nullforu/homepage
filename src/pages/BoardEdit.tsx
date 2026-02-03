import { Layout } from '../components/Layout'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getBoardPost, updateBoardPost, BoardPost } from '../api/client'

export const BoardEditPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [post, setPost] = useState<BoardPost | null>(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        anonymousName: '',
        password: '',
    })

    useEffect(() => {
        if (!id) return

        let cancelled = false

        const fetchPost = async () => {
            try {
                setLoading(true)
                const response = await getBoardPost(id)
                if (!cancelled) {
                    setPost(response.item)
                    setFormData({
                        title: response.item.title,
                        content: response.item.content || '',
                        anonymousName: response.item.anonymousName,
                        password: '',
                    })
                }
            } catch (error) {
                if (!cancelled) {
                    console.error('Failed to fetch board post:', error)
                    setError('게시글을 불러오는데 실패했습니다.')
                }
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        fetchPost()

        return () => {
            cancelled = true
        }
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!formData.title.trim()) {
            setError('제목을 입력해주세요.')
            return
        }
        if (!formData.content.trim()) {
            setError('내용을 입력해주세요.')
            return
        }
        if (!formData.anonymousName.trim()) {
            setError('작성자명을 입력해주세요.')
            return
        }
        if (!formData.password) {
            setError('비밀번호를 입력해주세요.')
            return
        }

        if (!id) return

        try {
            setSubmitting(true)
            await updateBoardPost(id, formData)
            navigate(`/board/${id}`)
        } catch (error: any) {
            console.error('Failed to update post:', error)
            setError(error.message || '게시글 수정에 실패했습니다. 다시 시도해주세요.')
        } finally {
            setSubmitting(false)
        }
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

    if (!post) {
        return (
            <Layout>
                <div className='max-w-4xl mx-auto px-4 py-6'>
                    <div className='text-center py-20 text-gray-500'>게시글을 찾을 수 없습니다.</div>
                    <div className='text-center'>
                        <button
                            onClick={() => navigate('/board')}
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
                <h1 className='text-3xl md:text-4xl font-semibold mb-8'>글 수정</h1>

                <form onSubmit={handleSubmit} className='bg-white rounded-xl border border-gray-100 overflow-hidden'>
                    <div className='p-6 space-y-4'>
                        {error && (
                            <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm'>
                                {error}
                            </div>
                        )}

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>제목</label>
                            <input
                                type='text'
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className='w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm'
                                placeholder='제목을 입력하세요'
                                disabled={submitting}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>작성자</label>
                            <input
                                type='text'
                                value={formData.anonymousName}
                                onChange={(e) => setFormData({ ...formData, anonymousName: e.target.value })}
                                className='w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm'
                                placeholder='작성자명을 입력하세요'
                                disabled={submitting}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                비밀번호 <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='password'
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className='w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm'
                                placeholder='작성 시 입력한 비밀번호'
                                disabled={submitting}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>내용</label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className='w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm'
                                placeholder='내용을 입력하세요'
                                rows={15}
                                disabled={submitting}
                            />
                        </div>
                    </div>

                    <div className='border-t border-gray-100 p-6 flex justify-between'>
                        <button
                            type='button'
                            onClick={() => navigate(`/board/${id}`)}
                            className='px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium'
                            disabled={submitting}
                        >
                            취소
                        </button>
                        <button
                            type='submit'
                            className='px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed'
                            disabled={submitting}
                        >
                            {submitting ? '수정 중...' : '수정 완료'}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
