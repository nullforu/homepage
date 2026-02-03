import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

export default function Markdown({ content }: { content: string }) {
    return (
        <div className='text-base md:text-[1.1rem]'>
            <ReactMarkdown
                components={{
                    h1: ({ children }) => (
                        <h1 className='text-4xl md:text-4xl font-semibold mb-6 mt-10 text-gray-900'>{children}</h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className='text-3xl md:text-3xl font-semibold mb-5 mt-8 text-gray-900'>{children}</h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className='text-2xl md:text-2xl font-semibold mt-6 mb-4 text-gray-900'>{children}</h3>
                    ),
                    h4: ({ children }) => (
                        <h4 className='text-xl md:text-xl font-semibold mt-5 mb-3 text-gray-800'>{children}</h4>
                    ),
                    h5: ({ children }) => (
                        <h5 className='text-lg md:text-lg font-semibold mt-4 mb-3 text-gray-800'>{children}</h5>
                    ),
                    h6: ({ children }) => (
                        <h6 className='text-base md:text-base font-semibold mt-3 mb-2 text-gray-800'>{children}</h6>
                    ),

                    p: ({ children }) => <p className='leading-relaxed mb-6 text-gray-600'>{children}</p>,

                    ul: ({ children }) => (
                        <ul className='list-disc list-inside mb-6 pl-2 space-y-2 text-gray-600'>{children}</ul>
                    ),
                    ol: ({ children }) => (
                        <ol className='list-decimal list-inside mb-6 space-y-2 text-gray-600'>{children}</ol>
                    ),

                    strong: ({ children }) => <strong className='font-semibold text-gray-900'>{children}</strong>,
                    em: ({ children }) => <em className='italic text-gray-700'>{children}</em>,

                    code: ({ children }) => (
                        <code className='bg-gray-100 px-2 py-1 rounded-md text-sm font-mono text-gray-800'>
                            {children}
                        </code>
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
                                className='max-w-full h-auto my-6 transition-all duration-300 rounded-xl'
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

                    blockquote: ({ children }) => (
                        <blockquote className='border-l-4 border-gray-900 bg-gray-50 px-5 pt-5 pb-1 my-6 rounded-r-lg'>
                            {children}
                        </blockquote>
                    ),

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
        </div>
    )
}
