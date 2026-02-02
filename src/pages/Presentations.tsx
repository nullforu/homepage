import { Footer } from '../components/Footer'
import { NavBar } from '../components/NavBar'
import { Presentations } from '../components/home/Presentations'

export const PresentationsPage = () => (
    <>
        <div className='page-content'>
            <NavBar active='presentations' />

            <div className='content-wrapper'>
                <div className='pt-30'>
                    <Presentations />

                    <div className='pt-20'>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    </>
)
