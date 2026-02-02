import { Layout } from '../components/Layout'
import Markdown from '../components/Markdown'
import curriculumContent from '../content/curriculum.md?raw'

export const CurriculumPage = () => {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="bg-white rounded-xl p-8 animate-fadeIn">
                    <Markdown content={curriculumContent} />
                </div>
            </div>
        </Layout>
    )
}
