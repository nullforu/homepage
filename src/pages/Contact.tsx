import { Layout } from '../components/Layout'

export const ContactPage = () => {
    return (
        <Layout>
            <div className='max-w-4xl mx-auto px-4 py-6'>
                <h1 className='text-3xl md:text-4xl font-semibold mb-8'>연락처</h1>

                <section className='mb-12'>
                    <h2 className='text-2xl font-semibold mb-6'>동아리 정보</h2>
                    <div className='border border-gray-100 p-6 rounded-xl space-y-4'>
                        <div className='flex flex-col md:flex-row'>
                            <span className='font-semibold md:w-32 mb-1 md:mb-0'>동아리명</span>
                            <span className='text-gray-700'>Null4U</span>
                        </div>
                        <div className='flex flex-col md:flex-row'>
                            <span className='font-semibold md:w-32 mb-1 md:mb-0'>소속</span>
                            <span className='text-gray-700'>세명컴퓨터고등학교</span>
                        </div>
                        <div className='flex flex-col md:flex-row'>
                            <span className='font-semibold md:w-32 mb-1 md:mb-0'>이메일</span>
                            <span className='text-gray-700'>normal8781@gmail.com (대가리꺼)</span>
                        </div>
                        <div className='flex flex-col md:flex-row'>
                            <span className='font-semibold md:w-32 mb-1 md:mb-0'>본부</span>
                            <span className='text-gray-700'>세명컴퓨터고등학교</span>
                        </div>
                    </div>
                </section>

                <section className='mb-12'>
                    <h2 className='text-2xl font-semibold mb-6'>우두머리</h2>
                    <div className='grid gap-4'>
                        <div className='border border-gray-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300'>
                            <div className='flex justify-between items-start mb-3'>
                                <h3 className='text-lg font-semibold'>김준영</h3>
                                <span className='text-sm bg-gray-900 text-white px-4 py-1.5 rounded-full'>부장</span>
                            </div>
                            <p className='text-gray-600 text-sm'>안녕하</p>
                        </div>
                    </div>
                </section>

                <section className='mb-12'>
                    <h2 className='text-2xl font-semibold mb-6'>SNS</h2>
                    <div className='space-y-3'>
                        <a
                            href='https://github.com/nullforu'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='border border-gray-100 p-5 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-between'
                        >
                            <span className='font-semibold'>GitHub</span>
                            <span className='text-gray-600'>github.com/nullforu</span>
                        </a>
                    </div>
                </section>

                <section>
                    <h2 className='text-2xl font-semibold mb-6'>참고</h2>
                    <div className='border border-gray-100 p-6 rounded-xl'>
                        <h3 className='font-semibold text-lg mb-3'>ㅌㅇㅇ</h3>
                        <p className='text-gray-600 mb-6'>나중에 추가</p>
                        <div className='bg-gray-50 p-5 rounded-xl text-sm text-gray-600 leading-relaxed'>
                            <p className='mb-3'>ㅇㅋ</p>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
