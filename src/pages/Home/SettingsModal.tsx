import { useEffect } from 'react'

type SettingsModalProps = {
    isOpen: boolean
    onClose: () => void
    disableAnimations: boolean
    onToggleAnimations: () => void
}

export function SettingsModal({ isOpen, onClose, disableAnimations, onToggleAnimations }: SettingsModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='absolute inset-0 bg-black/60 backdrop-blur-sm' onClick={onClose} />

            <div className='relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl mx-4'>
                <div className='mb-6 flex items-center justify-between'>
                    <h2 className='text-2xl font-bold text-slate-900'>설정</h2>
                    <button
                        onClick={onClose}
                        className='flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900'
                        aria-label='닫기'
                    >
                        <svg
                            className='h-5 w-5'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M6 18L18 6M6 6l12 12'
                            />
                        </svg>
                    </button>
                </div>

                <div className='space-y-4'>
                    <div className='flex items-center justify-between rounded-lg border border-slate-200 p-4'>
                        <div className='flex-1'>
                            <div className='font-semibold text-slate-900'>모든 애니메이션/인터랙티브 요소 끄기</div>
                            <div className='mt-1 text-sm text-slate-600'>
                                마우스 패럴랙스, 스크롤 애니메이션과 섹션 고정, 애니메이션 효과 등을 비활성화합니다.
                                기기의 GPU 성능이 낮거나 버벅임이 느껴질 때 활성화하세요.
                            </div>
                        </div>
                        <button
                            onClick={onToggleAnimations}
                            className={`ml-4 flex h-7 w-12 items-center rounded-full transition-colors ${
                                disableAnimations ? 'bg-slate-900' : 'bg-slate-300'
                            }`}
                            aria-label='애니메이션 토글'
                        >
                            <div
                                className={`h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
                                    disableAnimations ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                localStorage.clear()
                                window.location.reload()
                            }}
                            className='w-full rounded-lg border border-red-500 px-4 py-2 text-red-600 transition hover:bg-red-50'
                        >
                            로컬 스토리지 초기화하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
