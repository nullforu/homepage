import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

const CollapsibleBlockquote = ({ children }: { children: React.ReactNode }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [shouldCollapse, setShouldCollapse] = useState(false)
    const [hiddenLines, setHiddenLines] = useState(0)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (contentRef.current) {
            const lineHeight = parseFloat(getComputedStyle(contentRef.current).lineHeight)
            const height = contentRef.current.scrollHeight
            const lines = Math.round(height / lineHeight)

            if (lines > 10) {
                setShouldCollapse(true)
                setHiddenLines(lines - 10)
            }
        }
    }, [children])

    return (
        <blockquote className='border-l-4 border-gray-900 bg-gray-50 pl-6 py-3 my-6 rounded-r-lg relative'>
            <div
                ref={contentRef}
                className={`overflow-hidden transition-all duration-300 text-gray-700 ${
                    shouldCollapse && !isExpanded ? 'max-h-[16em]' : 'max-h-none'
                } ${shouldCollapse && !isExpanded ? 'blur-effect' : ''}`}
            >
                {children}
            </div>
            {shouldCollapse && !isExpanded && (
                <div
                    className='absolute bottom-0 left-0 right-0 h-24 pointer-events-none'
                    style={{
                        background:
                            'linear-gradient(to bottom, rgba(247, 250, 252, 0) 0%, rgba(247, 250, 252, 0.8) 50%, rgba(247, 250, 252, 1) 100%)',
                    }}
                />
            )}
            {shouldCollapse && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className='mt-3 text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 relative z-10 cursor-pointer underline underline-offset-2'
                >
                    {isExpanded ? '접기' : `(전체 보기 - ${hiddenLines}줄 더)`}
                </button>
            )}
        </blockquote>
    )
}

export default function Markdown({ content }: { content: string }) {
    return (
        <ReactMarkdown
            components={{
                h1: ({ children }) => <h1 className='text-4xl font-semibold mb-6 mt-10 text-gray-900'>{children}</h1>,
                h2: ({ children }) => <h2 className='text-3xl font-semibold mb-5 mt-8 text-gray-900'>{children}</h2>,
                h3: ({ children }) => <h3 className='text-2xl font-semibold mt-6 mb-4 text-gray-900'>{children}</h3>,
                h4: ({ children }) => <h4 className='text-xl font-semibold mt-5 mb-3 text-gray-800'>{children}</h4>,
                h5: ({ children }) => <h5 className='text-lg font-semibold mt-4 mb-3 text-gray-800'>{children}</h5>,
                h6: ({ children }) => <h6 className='text-base font-semibold mt-3 mb-2 text-gray-800'>{children}</h6>,
                p: ({ children }) => <p className='text-base leading-relaxed mb-6 text-gray-600'>{children}</p>,
                ul: ({ children }) => (
                    <ul className='list-disc list-inside mb-6 pl-2 space-y-2 text-gray-600'>{children}</ul>
                ),
                ol: ({ children }) => (
                    <ol className='list-decimal list-inside mb-6 space-y-2 text-gray-600'>{children}</ol>
                ),
                strong: ({ children }) => <strong className='font-semibold text-gray-900'>{children}</strong>,
                em: ({ children }) => <em className='italic text-gray-700'>{children}</em>,
                code: ({ children }) => (
                    <code className='bg-gray-100 px-2 py-1 rounded-md text-sm font-mono text-gray-800'>{children}</code>
                ),
                pre: ({ children }) => (
                    <pre className='bg-gray-50 border border-gray-200 p-4 rounded-xl mb-6 overflow-x-auto'>
                        {children}
                    </pre>
                ),
                hr: () => <hr className='border-gray-200 my-8' />,
                img: ({ src, alt }) => (
                    <a href={String(src)} target='_blank' rel='noopener noreferrer' className='block mb-6'>
                        <img
                            src={src}
                            alt={alt}
                            className='max-w-full h-auto my-6 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg'
                            loading='lazy'
                        />
                    </a>
                ),
                a: ({ href, children }) => (
                    <a
                        href={href}
                        className='text-blue-600 hover:text-blue-700 underline decoration-2 underline-offset-2 transition-colors'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        {children}
                    </a>
                ),
                blockquote: ({ children }) => <CollapsibleBlockquote>{children}</CollapsibleBlockquote>,
                div: ({ node, ...props }) => <div {...props} />,
                table: ({ node, ...props }) => <table {...props} />,
                thead: ({ node, ...props }) => <thead {...props} />,
                tbody: ({ node, ...props }) => <tbody {...props} />,
                tr: ({ node, ...props }) => <tr {...props} />,
                th: ({ node, ...props }) => <th {...props} />,
                td: ({ node, ...props }) => <td {...props} />,
            }}
            rehypePlugins={[rehypeRaw]}
        >
            {content}
        </ReactMarkdown>
    )
}
