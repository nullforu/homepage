import { Layout } from '../components/Layout'
import Markdown from '../components/Markdown'
import aboutContent from '../content/about.md?raw'

export const AboutPage = () => {
    return (
        <Layout>
            <div className='max-w-4xl mx-auto px-4 py-6'>
                <Markdown content={aboutContent} />
                <div className='mt-8 flex justify-end'>
                    <a
                        href='/curriculum'
                        className='inline-block rounded-lg border border-slate-900 px-6 py-3 text-sm font-semibold text-black'
                    >
                        커리큘럼 보러 가기
                    </a>
                </div>
            </div>
        </Layout>
    )
}
