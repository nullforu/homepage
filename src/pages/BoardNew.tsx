import { Layout } from '../components/Layout'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createBoardPost } from '../api/client'

export const BoardNewPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        anonymousName: '',
        password: '',
    })
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

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
        if (!formData.password || formData.password.length < 4) {
            setError('비밀번호는 4자 이상이어야 합니다.')
            return
        }

        try {
            setSubmitting(true)
            const response = await createBoardPost(formData)
            navigate(`/board/${response.id}`)
        } catch (error) {
            console.error('Failed to create post:', error)
            setError('게시글 작성에 실패했습니다. 다시 시도해주세요.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Layout>
            <div className='max-w-4xl mx-auto px-4 py-6'>
                <h1 className='text-3xl md:text-4xl font-semibold mb-8'>글쓰기</h1>

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
                                비밀번호 <span className='text-gray-500 text-xs'>(수정/삭제 시 필요)</span>
                            </label>
                            <input
                                type='password'
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className='w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm'
                                placeholder='비밀번호 (4자 이상)'
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
                            onClick={() => navigate('/board')}
                            className='px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium'
                            disabled={submitting}
                        >
                            취소
                        </button>
                        <button
                            type='submit'
                            className='px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed'
                            disabled={submitting}
                        >
                            {submitting ? '작성 중...' : '작성 완료'}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
