import { Link } from 'react-router-dom'
import { articles } from '../../data/articles'
import { Article } from './components/Article'

interface ArticlesProps {
    responsive?: boolean
    maxArticles?: number
    showViewOptions?: boolean
    viewMode?: 'default' | 'many'
    onViewModeChange?: (mode: 'default' | 'many') => void
}

export const Articles = (props: ArticlesProps) => {
    const gridClass = props.viewMode === 'many' ? 'grid gap-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'

    const gridStyle =
        props.viewMode === 'many' ? { gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' } : undefined

    const containerClass = props.viewMode === 'many' ? '-mx-[calc((100vw-1000px)/2)] px-16 max-lg:mx-0 max-lg:px-0' : ''

    const sortedArticles = props.maxArticles
        ? [...articles].sort((a, b) => {
            if (a.homePin && !b.homePin) return -1
            if (!a.homePin && b.homePin) return 1
            return 0
        })
        : articles

    return (
        <div className={containerClass}>
            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-bold text-gray-800'>Posts / Articles</h2>
                {props.showViewOptions && (
                    <div className='hidden lg:flex items-center gap-2'>
                        <select
                            value={props.viewMode || 'default'}
                            onChange={(e) => props.onViewModeChange?.(e.target.value as 'default' | 'many')}
                            className='px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500'
                        >
                            <option value='default'>기본 보기</option>
                            <option value='many'>더 많이 보기</option>
                        </select>
                    </div>
                )}
            </div>
            <div className={`${gridClass} max-lg:!grid-cols-1 md:max-lg:!grid-cols-2`} style={gridStyle}>
                {sortedArticles.slice(0, props.maxArticles).map((article, index) => (
                    <Article
                        key={index}
                        thumbnail={article.thumbnail}
                        title={article.title}
                        description={article.description}
                        date={article.date}
                        url={article.url}
                        tags={article.tags}
                        homePin={article.homePin}
                    />
                ))}
            </div>
            {props.maxArticles && articles.length > props.maxArticles ? (
                <Link
                    to='/articles'
                    className='w-full mt-8 py-3 px-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-700'
                >
                    <span>더 보기 (+{articles.length - props.maxArticles}개)</span>
                </Link>
            ) : (
                <a
                    href='https://velog.io/@yulmwu'
                    className='w-full mt-8 py-3 px-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-700'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <span>Velog에서 더 보기</span>
                </a>
            )}
        </div>
    )
}
