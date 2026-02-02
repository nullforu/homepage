import { useParams } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'
import Markdown from '../components/Markdown'
import { projects } from '../data/projects'
import { NotFound } from './NotFound'
import { Project } from '../components/home/components/Project'
import { useEffect } from 'react'

export const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>()
    const project = projects.find((p) => p.link.split('/').pop() === id)

    if (!project) {
        return <NotFound />
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='page-content'>
            <NavBar />

            <div className='content-wrapper'>
                <div className='pt-25'>
                    <Project
                        {...project}
                        link={project.github ?? project.link}
                        openLinkWithNewTab={project.github ? true : false}
                        isDetailPage
                    />
                    <Markdown content={project.markdown} />

                    <div className='pt-12'>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}
