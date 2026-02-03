const API_BASE_URL = 'https://wigt9kit0g.execute-api.ap-northeast-2.amazonaws.com'

export interface Announcement {
    id: string
    type: 'news' | 'notice'
    title: string
    description: string
    content?: string
    createdAt: string
    updatedAt: string
    views: number
}

export interface BoardPost {
    id: string
    title: string
    content?: string
    createdAt: string
    updatedAt: string
    anonymousName: string
    views: number
}

export interface PaginatedResponse<T> {
    ok: boolean
    items: T[]
    nextToken: string | null
}

export interface SingleResponse<T> {
    ok: boolean
    item: T
}

export interface CreateBoardPostRequest {
    title: string
    content: string
    anonymousName: string
    password: string
}

export interface UpdateBoardPostRequest {
    title: string
    content: string
    anonymousName: string
    password: string
}

export interface DeleteBoardPostRequest {
    password: string
}

export const listAnnouncements = async (
    type?: 'news' | 'notice' | 'home',
    limit: number = 20,
    nextToken?: string,
): Promise<PaginatedResponse<Announcement>> => {
    const params = new URLSearchParams()
    if (type) params.append('type', type)

    params.append('limit', limit.toString())

    if (nextToken) params.append('nextToken', nextToken)

    const response = await fetch(`${API_BASE_URL}/announcements?${params}`)
    if (!response.ok) throw new Error('Failed to fetch announcements')

    return response.json()
}

export const getAnnouncement = async (id: string): Promise<SingleResponse<Announcement>> => {
    const response = await fetch(`${API_BASE_URL}/announcements/${id}`)
    if (!response.ok) throw new Error('Failed to fetch announcement')

    return response.json()
}

export const listBoardPosts = async (limit: number = 20, nextToken?: string): Promise<PaginatedResponse<BoardPost>> => {
    const params = new URLSearchParams()
    params.append('limit', limit.toString())

    if (nextToken) params.append('nextToken', nextToken)

    const response = await fetch(`${API_BASE_URL}/board?${params}`)
    if (!response.ok) throw new Error('Failed to fetch board posts')

    return response.json()
}

export const getBoardPost = async (id: string): Promise<SingleResponse<BoardPost>> => {
    const response = await fetch(`${API_BASE_URL}/board/${id}`)
    if (!response.ok) throw new Error('Failed to fetch board post')

    return response.json()
}

export const createBoardPost = async (
    data: CreateBoardPostRequest,
): Promise<{ ok: boolean; id: string; createdAt: string }> => {
    const response = await fetch(`${API_BASE_URL}/board`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to create board post')

    return response.json()
}

export const updateBoardPost = async (
    id: string,
    data: UpdateBoardPostRequest,
): Promise<{ ok: boolean; id: string; updatedAt: string }> => {
    const response = await fetch(`${API_BASE_URL}/board/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        if (response.status === 403) {
            throw new Error('비밀번호가 일치하지 않습니다.')
        }

        throw new Error('Failed to update board post')
    }

    return response.json()
}

export const deleteBoardPost = async (
    id: string,
    data: DeleteBoardPostRequest,
): Promise<{ ok: boolean; id: string }> => {
    const response = await fetch(`${API_BASE_URL}/board/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        if (response.status === 403) {
            throw new Error('비밀번호가 일치하지 않습니다.')
        }

        throw new Error('Failed to delete board post')
    }

    return response.json()
}
