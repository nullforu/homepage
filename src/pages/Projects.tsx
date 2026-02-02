import { useEffect } from 'react'
import { Footer } from '../components/Footer'
import { Projects } from '../components/home/Projects'
import { NavBar } from '../components/NavBar'

export const ProjectsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='page-content'>
            <NavBar active='projects' />

            <div className='content-wrapper'>
                <div className='pt-30'>
                    <Projects />

                    <div className='pt-20'>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}
