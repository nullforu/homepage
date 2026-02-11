import { useEffect, useState } from 'react'

const VISITED_KEY = 'home-visited'
const NAVIGATION_KEYS = ['arrowdown', 'arrowup', 'arrowleft', 'arrowright', 's', 'w', 'a', 'd']

export function ScrollHint() {
    const [visible, setVisible] = useState(false)
    const [fading, setFading] = useState(false)

    useEffect(() => {
        const hasVisited = localStorage.getItem(VISITED_KEY)
        if (hasVisited) return

        setVisible(true)

        const hideHint = () => {
            setFading(true)
            localStorage.setItem(VISITED_KEY, 'true')

            setTimeout(() => {
                setVisible(false)
            }, 500)
        }

        const onScroll = () => {
            if (window.scrollY > 200) {
                hideHint()
            }
        }

        const onKeyDown = (e: KeyboardEvent) => {
            if (NAVIGATION_KEYS.includes(e.key.toLowerCase())) {
                hideHint()
            }
        }

        const onWheel = () => {
            hideHint()
        }

        window.addEventListener('scroll', onScroll)
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('wheel', onWheel, { passive: true })

        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('wheel', onWheel)
        }
    }, [])

    if (!visible) return null

    return (
        <div
            className='pointer-events-none fixed inset-x-0 bottom-20 z-40 flex justify-center'
            style={{
                animation: fading
                    ? 'fadeOut 0.5s ease-out forwards'
                    : 'fadeIn 0.5s ease-out, pulse 2s ease-in-out infinite 1s',
            }}
        >
            <div className='rounded-full bg-slate-900/80 px-6 py-3 text-sm font-medium text-white shadow-lg backdrop-blur-sm'>
                스크롤하거나 화살표로 이동할 수 있습니다.
            </div>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeOut {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(-10px); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
            `}</style>
        </div>
    )
}
