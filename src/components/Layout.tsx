import { ReactNode } from 'react'
import { NavBar } from './NavBar'
import { Footer } from './Footer'

type LayoutProps = {
    children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='flex flex-col min-h-screen bg-white'>
            <NavBar />
            <main className='flex-1 pt-14'>{children}</main>
            <Footer />
        </div>
    )
}
