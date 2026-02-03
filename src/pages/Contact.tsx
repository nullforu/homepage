import { Layout } from '../components/Layout'

const contactInfo = [
    {
        title: 'GitHub Organization',
        url: 'https://github.com/nullforu',
        displayText: 'github.com/nullforu',
    },
    {
        title: '스마트보안솔루션과 포털',
        url: 'https://smc-secu.net',
        displayText: 'smc-secu.net',
    },
    {
        title: 'Null4U 홍보용 페이지',
        url: 'https://null4u.swua.kr',
        displayText: 'null4u.swua.kr',
    },
]

export const ContactPage = () => {
    return (
        <Layout>
            <div className='max-w-4xl mx-auto px-4 py-6'>
                <h1 className='text-3xl md:text-4xl font-semibold mb-8'>연락처</h1>

                <section className='mb-12'>
                    <h2 className='text-2xl font-semibold mb-6'>동아리 정보</h2>
                    <div className='border border-gray-100 p-6 rounded-xl space-y-4'>
                        <div className='flex flex-col md:flex-row'>
                            <span className='font-semibold md:w-32 mb-1 md:mb-0'>소속</span>
                            <span className='text-gray-700'>세명컴퓨터고등학교 스마트보안솔루션과</span>
                        </div>
                        <div className='flex flex-col md:flex-row'>
                            <span className='font-semibold md:w-32 mb-1 md:mb-0'>동아리명</span>
                            <span className='text-gray-700'>Null4U</span>
                        </div>
                        <div className='flex flex-col md:flex-row'>
                            <span className='font-semibold md:w-32 mb-1 md:mb-0'>이메일</span>
                            <span className='text-gray-700'>me@swua.kr (부장 이메일)</span>
                        </div>
                    </div>
                </section>

                <section className='mb-12'>
                    <h2 className='text-2xl font-semibold mb-6'>SNS/웹 페이지</h2>
                    <div className='space-y-3'>
                        {contactInfo.map((info, index) => (
                            <a
                                key={index}
                                href={info.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='border border-gray-100 p-5 rounded-xl flex items-center justify-between'
                            >
                                <span className='font-semibold'>{info.title}</span>
                                <span className='text-gray-600'>{info.displayText}</span>
                            </a>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className='text-2xl font-semibold mb-6'>참고</h2>
                    <div className='border border-gray-100 p-6 rounded-xl'>
                        <p className='text-gray-600 mb-6'>
                            연락은 위 이메일이나 동아리원 개인 SNS, 또는 부장 SNS나 학과 선생님/SNS을 통해서도
                            가능합니다.
                        </p>
                        <div className='bg-gray-50 p-5 rounded-xl text-sm text-gray-600 leading-relaxed'>
                            <p className='mb-3'>
                                부장 Linkedin:{' '}
                                <a
                                    href='https://www.linkedin.com/in/yulmwu'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-blue-700'
                                >
                                    https://www.linkedin.com/in/yulmwu
                                </a>
                            </p>
                            <p className='mb-3'>
                                부장 Github:{' '}
                                <a
                                    href='https://github.com/yulmwu'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-blue-700'
                                >
                                    https://github.com/yulmwu
                                </a>
                            </p>
                            <p className='mb-3'>부장 Discord: @rlawnsdud</p>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
