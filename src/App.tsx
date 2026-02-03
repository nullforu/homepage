import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Home } from './pages/Home'
import { AboutPage } from './pages/About'
import { CurriculumPage } from './pages/Curriculum'
import { ProjectsPage } from './pages/Projects'
import { RecruitmentPage } from './pages/Recruitment'
import { ContactPage } from './pages/Contact'
import { BoardPage } from './pages/Board'
import { BoardNewPage } from './pages/BoardNew'
import { BoardEditPage } from './pages/BoardEdit'
import { NoticePage } from './pages/Notice'
import { NoticeDetailPage } from './pages/NoticeDetail'
import { BoardDetailPage } from './pages/BoardDetail'
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
                <Route path='/board/new' element={<BoardNewPage />} />
                <Route path='/board/:id/edit' element={<BoardEditPage />} />
                <Route path='/board/:id' element={<BoardDetailPage />} />
                <Route path='/notice' element={<NoticePage />} />
                <Route path='/notices' element={<NoticePage />} />
                <Route path='/notices/:id' element={<NoticeDetailPage />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default App
