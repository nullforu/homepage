export const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 mt-auto">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="font-semibold text-base mb-3">Null4U</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            세명컴퓨터고등학교<br />
                            클라우드 컴퓨팅/DevOps 전공 심화 동아리
                        </p>
                    </div>
                    
                    <div>
                        <h3 className="font-semibold text-base mb-3">Links</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="/about" className="hover:text-gray-900 transition-colors">소개</a></li>
                            <li><a href="/curriculum" className="hover:text-gray-900 transition-colors">커리큘럼</a></li>
                            <li><a href="/projects" className="hover:text-gray-900 transition-colors">프로젝트</a></li>
                            <li><a href="/recruitment" className="hover:text-gray-900 transition-colors">모집안내</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="font-semibold text-base mb-3">Contact</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="mailto:normal8781@gmail.com" className="hover:text-gray-900 transition-colors">normal8781@gmail.com</a></li>
                            <li><a href="https://github.com/nullforu" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">github.com/nullforu</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
                    © 2026 Null4U. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
