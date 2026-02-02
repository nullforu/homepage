import { Layout } from '../components/Layout'
import Markdown from '../components/Markdown'
import recruitmentContent from '../content/recruitment.md?raw'

export const RecruitmentPage = () => {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="bg-white rounded-xl p-8 animate-fadeIn">
                    <Markdown content={recruitmentContent} />
                </div>
            </div>
        </Layout>
    )
}
