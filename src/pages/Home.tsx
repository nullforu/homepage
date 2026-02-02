import { Layout } from '../components/Layout'

export const Home = () => {
    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4 py-6">
                <section className="py-16 text-center bg-white rounded-xl mb-6 animate-fadeIn">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Null4U</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        세명컴퓨터고등학교 클라우드 컴퓨팅/DevOps 전공 심화 동아리
                    </p>
                    <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        ㅇㅇㅇ
                    </p>
                </section>

                <section className="py-12 bg-white rounded-xl mb-6 animate-fadeIn">
                    <h2 className="text-3xl font-bold text-center mb-10">주요 활동</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                        <div className="border border-gray-100 rounded-xl p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="text-4xl mb-4">ㅇㅇ</div>
                            <h3 className="text-lg font-bold mb-3">대충 제목</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                대충 내용대충 내용대충 내용대충 내용
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-all">
                            <div className="text-3xl mb-3">ㄴㄴ</div>
                            <h3 className="text-base font-semibold mb-2">대충 내용</h3>
                            <p className="text-gray-700 text-sm">
                                대충 내용대충 내용대충 내용
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-all">
                            <div className="text-3xl mb-3">ㄱㄱ</div>
                            <h3 className="text-base font-semibold mb-2">대충 내용대충 내용대충 내용</h3>
                            <p className="text-gray-700 text-sm">
                                대충 내용대충 내용대충 내용
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-12 bg-white rounded-xl mb-6 animate-fadeIn">
                    <h2 className="text-3xl font-bold text-center mb-10">최근 소식</h2>
                    <div className="space-y-4 px-4">
                        <div className="border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg font-bold">ㅈㅈㅈ</h3>
                                <span className="text-xs text-gray-500">ㅇㅇ</span>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                ㅇㅇ
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-base font-semibold">ㅁㄴㅇㅁㄴㅇ</h3>
                                <span className="text-xs text-gray-500">ㅁㅇㅇㄴㄹㄴㅇ</span>
                            </div>
                            <p className="text-gray-700 text-sm">
                                ㄴㅇㅎㄹㄴㄴㄹ
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-base font-semibold">ㅇㄹㄴㄴㅇㄹㄹㅇㄴ</h3>
                                <span className="text-xs text-gray-500">ㄴㅇㄹㄴㅇㄹ</span>
                            </div>
                            <p className="text-gray-700 text-sm">
                                ㅇㄴㅁㅇㄴㄹ
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16 text-center bg-white rounded-xl animate-fadeIn">
                    <h2 className="text-3xl font-bold mb-4">가입하기</h2>
                    <p className="text-gray-600 mb-8">
                        함께 나아갈 동아리원을 모집합니다.
                    </p>
                    <button className="px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg">
                        지원하기
                    </button>
                </section>
            </div>
        </Layout>
    )
}
