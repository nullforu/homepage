import { CardContainerContent } from '../components/home/CardContainer'

export const histories: CardContainerContent[] = [
    {
        // logoColor: '#9CDCFF',
        title: '전공 동아리 Null4U',
        description: '세명컴퓨터고등학교 보안과 클라우드 전공동아리',
        period: '2025.03 ~',
    },
    {
        // logoColor: '#bdecb6',
        title: '세명컴퓨터고등학교',
        description: '스마트보안솔루션과 11기',
        period: '2024.03 ~',
    },
    // {
    //     logoColor: '#9DE3A4',
    //     title: '영원중학교 (졸업)',
    //     description: '3년 개근',
    //     period: '2021.03 - 2024.02',
    // },
    // {
    //     logoColor: '#9DE3A4',
    //     title: '서울도림초등학교 (졸업)',
    //     description: '6년 개근',
    //     period: '2015.03 - 2021.02',
    // },
]

export interface WorkExperienceContent {
    logo?: string
    logoColor?: string
    organization: string
    position: string
    description?: string
    period: string
    skills?: string[]
}

export const workExperience: WorkExperienceContent[] = [
    {
        // logoColor: '#4285F4',
        organization: '보안과 전공 동아리 Null4U',
        position: '동아리 부장',
        description: '클라우드 컴퓨팅/DevOps 동아리 운영 및 관리',
        period: '2025.07 ~',
        skills: ['AWS', 'Kubernetes'],
    },
    {
        // logoColor: '#C13584',
        organization: '학급 임원 (대의원회)',
        position: '1학년 1학기 회장, 2학년 1학기 회장',
        period: '2024, 2025',
    },
    {
        // logoColor: '#E1306C',
        organization: '세명컴퓨터고등학교 방송부 SBC',
        position: '메인 엔지니어',
        period: '2024.03 ~ 2025.01',
    },
    // {
    //     logoColor: '#34A853',
    //     organization: 'XYZ Solutions',
    //     position: 'Frontend Developer',
    //     description: '사용자 경험 중심의 인터페이스 개발',
    //     period: '2021.03 ~ 2022.12',
    //     skills: ['Vue.js', 'JavaScript', 'Tailwind CSS'],
    // },
]

export interface AwardContent {
    title: string
    organization: string
    date: string
    rank?: string
    important?: boolean
}

export const awards: AwardContent[] = [
    {
        title: '(2025) 사이버공격방어대회(CCE) 2025',
        organization: '국가정보원 · 국가보안기술연구소',
        date: '2025. 09',
        rank: '본선 진출',
        important: true,
    },
    {
        title: '(2025) WHITEHAT 2025',
        organization: '국방부 · 사이버작전사령부',
        date: '2025. 11',
        rank: '본선 진출',
        important: true,
    },
    {
        title: '(2025) 중부대학교(JBU) CTF 2025',
        organization: '중부대학교',
        date: '2025. 10',
        rank: '중고등부 우수상',
        important: true,
    },
    {
        title: '(2025) 사이버가디언즈 경진대회 2025',
        organization: '한국정보기술연구원',
        date: '2025. 10',
        rank: '6위 (장려상)',
        important: true,
    },
    {
	title: '(2025) 가톨릭대학교 HolyShield CTF 2025',
	organization: '가톨릭대학교',
	date: '2025. 12',
	rank: '5위',
	important: true,
    },
    {
        title: '(1학년 1학기) 세명컴퓨터고등학교 선행상',
        organization: '세명컴퓨터고등학교',
        date: '2024. 07',
    },
    {
        title: '(1학년 1학기) 교과우수상\n(음악, 프로그래밍, 컴퓨터 보안)',
        organization: '세명컴퓨터고등학교',
        date: '2024.07',
    },
    {
        title: '(1학년 2학기) 교과우수상\n(음악, 프로그래밍, 정보 처리와 관리, 컴퓨터 보안)',
        organization: '세명컴퓨터고등학교',
        date: '2025.02',
    },
    {
        title: '(1학년 1학기) 2024 세명컴퓨터고등학교 미래인재 코딩, 정보보안 챌린지',
        organization: '세명컴퓨터고등학교',
        date: '2024.07',
        rank: '3위 (은상)',
    },
    {
        title: '(2학년 1학기) 교과우수상\n(데이터베이스, 응용 프로그래밍 개발/화면 구현)',
        organization: '세명컴퓨터고등학교',
        date: '2025.07',
    },
    {
        title: '(2학년 1학기) 2025 세명컴퓨터고등학교 수업량 유연화 주간 프로젝트',
        organization: '세명컴퓨터고등학교',
        date: '2025.07',
        rank: '2위',
    },
    {
        title: '(2학년 2학기) 2025 세명컴퓨터고등학교 정보보안 챌린지',
        organization: '세명컴퓨터고등학교',
        date: '2025.11',
        rank: '3위 (은상)',
    },
]
