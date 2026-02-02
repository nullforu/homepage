import { Layout } from '../components/Layout'

const notices = [
    {
        id: 1,
        title: '2026년 1학기 신입 부원 모집 안내',
        author: '관리자',
        date: '2026-02-01',
        views: 24000
    },
]

export const BoardPage = () => {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="bg-white rounded-xl p-8 animate-fadeIn">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8">게시판</h1>
                
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input 
                            type="text" 
                            placeholder="검색어를 입력하세요"
                            className="flex-1 border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                        />
                        <button className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-medium shadow-sm hover:shadow-md">
                            검색
                        </button>
                    </div>
                </div>

                <div className="border border-gray-100 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 border-b border-gray-100">
                        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-bold">
                            <div className="col-span-1 text-center">번호</div>
                            <div className="col-span-6">제목</div>
                            <div className="col-span-2 text-center">작성자</div>
                            <div className="col-span-2 text-center">작성일</div>
                            <div className="col-span-1 text-center">조회</div>
                        </div>
                    </div>
                    <div>
                        {notices.map((notice, index) => (
                            <div 
                                key={notice.id}
                                className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors text-sm"
                            >
                                <div className="col-span-1 text-center text-gray-600">
                                    {notices.length - index}
                                </div>
                                <div className="col-span-6 font-medium">
                                    {notice.title}
                                </div>
                                <div className="col-span-2 text-center text-gray-600">
                                    {notice.author}
                                </div>
                                <div className="col-span-2 text-center text-gray-600">
                                    {notice.date}
                                </div>
                                <div className="col-span-1 text-center text-gray-600">
                                    {notice.views}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-2">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">이전</button>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium text-sm">1</button>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">2</button>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">3</button>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">다음</button>
                </div>
                </div>
            </div>
        </Layout>
    )
}
