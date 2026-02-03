import { Layout } from '../components/Layout'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getBoardPost, deleteBoardPost, BoardPost } from '../api/client'
import Markdown from '../components/Markdown'

export const BoardDetailPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [post, setPost] = useState<BoardPost | null>(null)
    const [loading, setLoading] = useState(true)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deletePassword, setDeletePassword] = useState('')
    const [deleteError, setDeleteError] = useState('')
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        if (!id) return

        let cancelled = false

        const fetchPost = async () => {
            try {
                setLoading(true)
                const response = await getBoardPost(id)
                if (!cancelled) {
                    setPost(response.item)
                }
            } catch (error) {
                if (!cancelled) {
                    console.error('Failed to fetch board post:', error)
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const handleDelete = async () => {
        if (!id || !deletePassword) {
            setDeleteError('비밀번호를 입력해주세요.')
            return
        }

        try {
            setDeleting(true)
            setDeleteError('')
            await deleteBoardPost(id, { password: deletePassword })
            navigate('/board')
        } catch (error: any) {
            console.error('Failed to delete post:', error)
            setDeleteError(error.message || '삭제에 실패했습니다. 다시 시도해주세요.')
        } finally {
            setDeleting(false)
        }
    }

    const handleDeleteClick = () => {
        setShowDeleteModal(true)
        setDeletePassword('')
        setDeleteError('')
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
        <>
            <Layout>
                <div className='max-w-4xl mx-auto px-4 py-6'>
                    <div className='bg-white rounded-xl border border-gray-100 overflow-hidden'>
                        <div className='border-b border-gray-100 p-6'>
                            <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
                            <div className='flex items-center gap-4 text-sm text-gray-600'>
                                <span>작성자: {post.anonymousName}</span>
                                <span>•</span>
                                <span>작성일: {formatDate(post.createdAt)}</span>
                                <span>•</span>
                                <span>조회수: {post.views}</span>
                                {post.updatedAt !== post.createdAt && (
                                    <>
                                        <span>•</span>
                                        <span>수정일: {formatDate(post.updatedAt)}</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className='p-6'>
                            <div className='prose max-w-none'>
                                {post.content ? (
                                    <Markdown content={post.content} />
                                ) : (
                                    <div className='text-gray-500'>내용이 없습니다.</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='mt-6 flex justify-between'>
                        <button
                            onClick={() => navigate('/board')}
                            className='px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium'
                        >
                            목록으로
                        </button>
                        <div className='flex gap-2'>
                            <button
                                onClick={() => navigate(`/board/${id}/edit`)}
                                className='px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium'
                            >
                                수정
                            </button>
                            <button
                                onClick={handleDeleteClick}
                                className='px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all text-sm font-medium'
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>

            {showDeleteModal && (
                <div className='fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50'>
                    <div className='bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl'>
                        <h2 className='text-xl font-semibold mb-4'>게시글 삭제</h2>
                        <p className='text-gray-600 mb-4'>게시글을 삭제하려면 비밀번호를 입력해주세요.</p>

                        {deleteError && (
                            <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4'>
                                {deleteError}
                            </div>
                        )}

                        <input
                            type='password'
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                            className='w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm mb-4'
                            placeholder='비밀번호'
                            disabled={deleting}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleDelete()
                                }
                            }}
                        />

                        <div className='flex gap-2 justify-end'>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className='px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium'
                                disabled={deleting}
                            >
                                취소
                            </button>
                            <button
                                onClick={handleDelete}
                                className='px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed'
                                disabled={deleting}
                            >
                                {deleting ? '삭제 중...' : '삭제'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
