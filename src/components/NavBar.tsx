import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface NavBarProps {
    active?: 'home' | 'projects' | 'articles' | 'presentations' | 'socials' | 'pledge'
}

const navBarItems = [
    { name: 'Home', link: '/', active: 'home' },
    { name: 'Projects', link: '/projects', active: 'projects' },
    { name: 'Articles', link: '/articles', active: 'articles' },
    { name: 'Presentations', link: '/presentations', active: 'presentations' },
    { name: 'Socials', link: '/socials', active: 'socials' },
    { name: 'Pledge', link: '/pledge', active: 'pledge' }
]

export const NavBar = ({ active }: NavBarProps) => {
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY < 10) {
                setIsVisible(true)
            } else if (currentScrollY > lastScrollY) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollY])

    return (
        <div className='hidden md:flex justify-center items-center m-0'>
            <nav
                className={`fixed top-4 z-50 flex justify-center items-center w-full transition-transform duration-300 ease-in-out ${
                    isVisible ? 'translate-y-0' : '-translate-y-20'
                }`}
            >
                <div className='h-10 px-6 bg-white/30 backdrop-blur-lg border border-white/20 shadow-md rounded-full'>
                    <ul className='flex gap-7 items-center h-full list-none text-sm'>
                        {navBarItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.link}
                                    className={`font-bold ${
                                        active === item.active
                                            ? 'text-blue-500 hover:text-blue-600'
                                            : 'text-gray-500 hover:text-gray-600'
                                    } transition-colors duration-300 hover:scale-110`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    )
}
