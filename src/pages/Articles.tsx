import { useEffect, useState } from 'react'
import { Footer } from '../components/Footer'
import { NavBar } from '../components/NavBar'
import { articles } from '../data/articles'
import { Article } from '../components/home/components/Article'

export const ArticlesPage = () => {
    const [viewMode, setViewMode] = useState<'default' | 'many'>('default')

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const groupedBySeries = articles.reduce((acc, article) => {
        const seriesName = article.series?.name || '미분류'
        if (!acc[seriesName]) {
            acc[seriesName] = {
                series: article.series,
                articles: [],
            }
        }
        acc[seriesName].articles.push(article)
        return acc
    }, {} as Record<string, { series?: { name: string; url_slug: string }; articles: typeof articles }>)

    const sortedSeries = Object.entries(groupedBySeries).sort(([a], [b]) => {
        const priority = ['AWS', 'Kubernetes', 'Cloudflare']
        const aIndex = priority.indexOf(a)
        const bIndex = priority.indexOf(b)

        if (a === '미분류') return 1
        if (b === '미분류') return -1

        if (a === 'Misc') return 1
        if (b === 'Misc') return -1

        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
        if (aIndex !== -1) return -1
        if (bIndex !== -1) return 1

        return a.localeCompare(b)
    })

    const gridClass = viewMode === 'many' ? 'grid gap-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    const gridStyle = viewMode === 'many' ? { gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' } : undefined
    const containerClass =
        viewMode === 'many' ? 'relative -mx-[calc((100vw-1000px)/2)] px-16 max-lg:mx-0 max-lg:px-0' : ''

    return (
        <div className='page-content'>
            <NavBar active='articles' />

            <div className='content-wrapper'>
                <div className='pt-30'>
                    <div className={containerClass}>
                        <div className='flex items-center justify-between mb-6'>
                            {/* <h2 className='text-2xl font-bold text-gray-800'>Posts / Articles</h2> */}
                            <div className='flex flex-row items-baseline gap-3'>
                                <h2 className='text-2xl font-bold text-gray-800'>Posts / Articles</h2>
                                <p className='text-sm text-gray-500'>(총 {articles.length}개)</p>
                            </div>
                            <div className='hidden lg:flex items-center gap-2'>
                                <select
                                    value={viewMode}
                                    onChange={(e) => setViewMode(e.target.value as 'default' | 'many')}
                                    className='px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500'
                                >
                                    <option value='default'>기본 보기</option>
                                    <option value='many'>더 많이 보기</option>
                                </select>
                            </div>
                        </div>

                        {sortedSeries.map(([seriesName, { series, articles: seriesArticles }]) => (
                            <div key={seriesName} className='mb-12'>
                                <div className='flex items-center gap-3 mb-4'>
                                    {series ? (
                                        <a
                                            href={`https://velog.io/@yulmwu/series/${series.url_slug}`}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2'
                                        >
                                            <span>{seriesName}</span>
                                            <svg
                                                className='w-4 h-4'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth={2}
                                                    d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                                                />
                                            </svg>
                                        </a>
                                    ) : (
                                        <h3 className='text-xl font-bold text-gray-800'>{seriesName}</h3>
                                    )}
                                    <span className='text-sm text-gray-500'>({seriesArticles.length}개)</span>
                                </div>
                                <div
                                    className={`${gridClass} max-lg:!grid-cols-1 md:max-lg:!grid-cols-2`}
                                    style={gridStyle}
                                >
                                    {seriesArticles.map((article, index) => (
                                        <Article
                                            key={index}
                                            thumbnail={article.thumbnail}
                                            title={article.title}
                                            description={article.description}
                                            date={article.date}
                                            url={article.url}
                                            tags={article.tags}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}

                        <a
                            href='https://velog.io/@yulmwu'
                            className='w-full mt-8 py-3 px-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-700'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <span>Velog에서 더 보기</span>
                        </a>
                    </div>

                    <div className='pt-20'>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}
