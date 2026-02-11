import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const NavBar = () => {
    const location = useLocation()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const [isAtTop, setIsAtTop] = useState(true)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY < 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const getItemPathsRecursively = (item: any): string[] => {
        let paths = [item.path]
        if (item.dropdown) {
            for (const subItem of item.dropdown) {
                paths = paths.concat(getItemPathsRecursively(subItem))
            }
        }
        return paths
    }

    const isActive = (paths: string[]) => {
        return paths.includes(location.pathname)
    }

    const menuItems = [
        { path: '/', label: '홈' },
        {
            path: '/about',
            label: '소개',
            dropdown: [
                { path: '/about', label: '동아리 소개' },
                { path: '/curriculum', label: '커리큘럼' },
            ],
        },
        { path: '/projects', label: '프로젝트' },
        {
            path: '/board',
            label: '커뮤니티',
            dropdown: [
                { path: '/notice', label: '공지사항' },
                { path: '/board', label: '자유게시판' },
            ],
        },
        {
            path: '/recruitment',
            label: '모집안내',
            dropdown: [
                { path: '/recruitment', label: '모집안내' },
                { path: '/contact', label: '연락처' },
            ],
        },
    ]

    useEffect(() => {
        setIsSidebarOpen(false)
    }, [location.pathname])

    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isSidebarOpen])

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isAtTop ? 'bg-transparent' : 'md:pt-4'
                }`}
            >
                <div
                    className={`max-w-6xl mx-auto px-4 border transition-all duration-300 ${
                        isAtTop
                            ? 'border-transparent md:rounded-none shadow-none bg-transparent'
                            : 'border-transparent md:border-gray-200 md:rounded-2xl md:shadow-md bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/10'
                    }`}
                >
                    <div className='flex items-center justify-between h-14'>
                        <div className='flex items-center gap-1'>
                            <button
                                className='md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors'
                                onClick={toggleSidebar}
                            >
                                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M4 6h16M4 12h16M4 18h16'
                                    />
                                </svg>
                            </button>
                            <Link
                                to='/'
                                className='text-lg font-semibold hover:text-gray-700 transition-colors hidden md:block'
                            >
                                <img src='/images/logo_dark_cropped.svg' alt='Null4U' className='h-6 w-auto' />
                            </Link>
                        </div>

                        <div className='hidden md:flex gap-2'>
                            {menuItems.map((item) => (
                                <div
                                    key={item.path}
                                    className='relative group'
                                    onMouseEnter={() => item.dropdown && setOpenDropdown(item.path)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <Link
                                        to={item.path}
                                        className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 text-sm ${
                                            isActive(getItemPathsRecursively(item))
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {item.label}
                                        {item.dropdown && (
                                            <svg
                                                className='w-3 h-3'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth={2}
                                                    d='M19 9l-7 7-7-7'
                                                />
                                            </svg>
                                        )}
                                    </Link>
                                    {item.dropdown && (
                                        <div
                                            className={`absolute top-full left-0 pt-1 z-50 overflow-hidden transition-all duration-200 ease-out ${
                                                openDropdown === item.path
                                                    ? 'opacity-100 translate-y-0 max-h-60'
                                                    : 'opacity-0 -translate-y-2 max-h-0 pointer-events-none'
                                            }`}
                                        >
                                            <div className='w-40 bg-white rounded-lg shadow-lg border border-gray-200'>
                                                {item.dropdown.map((subItem) => (
                                                    <Link
                                                        key={subItem.path}
                                                        to={subItem.path}
                                                        className='block px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
                                                        onClick={() => setOpenDropdown(null)}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            <div
                className={`fixed inset-0 bg-black z-[51] md:hidden transition-opacity duration-300 ${
                    isSidebarOpen ? 'opacity-20 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={toggleSidebar}
            />

            <div
                className={`fixed top-0 left-0 bottom-0 w-64 bg-white shadow-2xl z-[52] md:hidden transform transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className='flex items-center justify-between p-4 border-b'>
                    <span className='text-lg font-semibold'>메뉴</span>
                    <button className='p-2 rounded-lg hover:bg-gray-50 transition-colors' onClick={toggleSidebar}>
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M6 18L18 6M6 6l12 12'
                            />
                        </svg>
                    </button>
                </div>
                <div className='flex flex-col p-4 h-full overflow-y-auto'>
                    {menuItems.map((item) => (
                        <div key={item.path}>
                            <Link
                                to={item.path}
                                className={`px-3 py-2 rounded-lg mb-2 transition-all flex items-center justify-between text-sm ${
                                    isActive(getItemPathsRecursively(item))
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {item.label}
                            </Link>
                            {item.dropdown && (
                                <div className='ml-4 mb-2 space-y-1'>
                                    {item.dropdown.map((subItem) => (
                                        <Link
                                            key={subItem.path}
                                            to={subItem.path}
                                            className='block px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-100 transition-colors'
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
