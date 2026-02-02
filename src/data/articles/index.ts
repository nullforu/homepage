import posts from './posts.json'
import homePins from './homePins.json'

export interface Article {
    thumbnail?: string
    title: string
    description: string
    date: string
    url: string
    tags?: string[]
    homePin?: boolean
    series?: {
        name: string
        url_slug: string
    }
}

export const articles: Article[] = posts.map((post) => ({
    thumbnail: post.thumbnail,
    title: post.title,
    description: post.short_description,
    date: new Date(post.released_at).toISOString().split('T')[0],
    url: `https://velog.io/@${post.user.username}/${post.url_slug}`,
    tags: post.tags,
    series: post.series,
    homePin: homePins.includes(post.id),
}))
