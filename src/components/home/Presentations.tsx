import { Presentation } from './components/Presentation'
import { presentations } from '../../data/presentations'

interface PresentationsProps {
    maxPresentations?: number
}

export const Presentations = ({ maxPresentations }: PresentationsProps) => (
    <div>
        <h2 className='text-2xl font-bold text-gray-800 mb-6'>Presentations & Seminars</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {presentations.slice(0, maxPresentations).map((presentation, index) => (
                <Presentation
                    key={index}
                    thumbnail={presentation.thumbnail}
                    title={presentation.title}
                    event={presentation.event}
                    date={presentation.date}
                    description={presentation.description}
                    tags={presentation.tags}
                    slidesLink={presentation.slidesLink}
                    videoLink={presentation.videoLink}
                    blogLink={presentation.blogLink}
                />
            ))}
        </div>
    </div>
)
