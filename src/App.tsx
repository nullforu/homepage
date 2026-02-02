import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Home } from './pages/Home'
import { AboutPage } from './pages/About'
import { CurriculumPage } from './pages/Curriculum'
import { ProjectsPage } from './pages/Projects'
import { RecruitmentPage } from './pages/Recruitment'
import { ContactPage } from './pages/Contact'
import { BoardPage } from './pages/Board'
import { NotFound } from './pages/NotFound'

import './App.css'

const App = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/curriculum' element={<CurriculumPage />} />
                <Route path='/projects' element={<ProjectsPage />} />
                <Route path='/recruitment' element={<RecruitmentPage />} />
                <Route path='/contact' element={<ContactPage />} />
                <Route path='/board' element={<BoardPage />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default App
