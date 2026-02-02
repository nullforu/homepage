import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

interface BannerProps {
    children: React.ReactNode
    key: string
    color?: string
    link?: string
}

export const Banner = ({ children, key, color = 'bg-blue-400', link }: BannerProps) => {
    const [isVisible, setIsVisible] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem(`bannerDismissed_${key}`)) {
            setIsVisible(true)
        }
    }, [])

    const handleDismiss = () => {
        setIsVisible(false)
        localStorage.setItem(`bannerDismissed_${key}`, 'true')
    }

    const handleClick = () => {
        if (link) {
            if (link.startsWith('http://') || link.startsWith('https://')) window.open(link, '_blank')
            else navigate(link)
        }
    }

    if (!isVisible) return null

    return (
        <div className={`w-full bg-primary text-white shadow-md rounded-lg mb-4 ${color}`}>
            <div className='px-4 py-3 flex items-center justify-between'>
                <div className='flex flex-col gap-1 flex-1 cursor-pointer' onClick={handleClick}>
                    {children}
                </div>
                <button
                    onClick={handleDismiss}
                    className='ml-4 p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer'
                    aria-label='Close banner'
                >
                    <FontAwesomeIcon icon={faXmark} className='text-lg' />
                </button>
            </div>
        </div>
    )
}
