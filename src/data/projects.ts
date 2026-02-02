export interface Project {
    logo?: string
    title: string
    description: string
    period: string
    link: string
    github: string
    homePin?: boolean
    tags?: string[]
    detailTags?: string[]
    markdown: string
}

export const projectsRaw: Project[] = [
        {
        // logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg',
        title: 'SMCTF',
        description: 'A CTF(Capture The Flag) platform optimized for easy initial configuration.',
        period: '26.01.20 ~',
        link: '/projects/smctf',
        github: 'https://github.com/nullforu/smctf',
        homePin: true,
        tags: ['Go', 'Svelte', 'PostgreSQL', 'Redis'],
        detailTags: ['Backend', 'Frontend', 'Go', 'Svelte', 'PostgreSQL', 'Redis', 'Gin', 'Bun', 'TailwindCSS'],
        markdown: `
# Test
        `,
    },
    {
        // logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg',
        title: 'ALS3',
        description: 'A Lightweight STaaS Storage Service with AWS S3 storage.',
        period: '25.11.15 ~',
        link: '/projects/als3',
        github: 'https://github.com/yulmwu/als3',
        homePin: true,
        tags: ['AWS S3', 'TypeScript', 'NestJS', 'TypeORM'],
        detailTags: ['Backend', 'TypeScript', 'NestJS', 'TypeORM', 'PostgreSQL', 'Redis', 'AWS S3', 'NextJS', 'React'],
        markdown: `
# Test
        `,
    },
    {
        // logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg',
        title: 'ALS3 Terraform IaC',
        description: 'Infrastructure as Code for ALS3 using Terraform.',
        period: '25.12.25 ~',
        link: '/projects/als3-terraform',
        github: 'https://github.com/yulmwu/als3-terraform',
        homePin: true,
        tags: ['Terraform', 'AWS'],
        detailTags: ['IaC', 'Terraform', 'AWS'],
        markdown: `
# Test
        `,
    },
    {
        // logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg',
        title: 'Backend of 0725',
        description: 'Backend of 0725 Community(Forum) Project',
        period: '25.07.25 ~',
        link: '/projects/0725-backend',
        github: 'https://github.com/0725-project/backend',
        homePin: true,
        tags: ['TypeScript', 'NestJS', 'TypeORM'],
        detailTags: ['Backend', 'TypeScript', 'NestJS', 'TypeORM', 'PostgreSQL', 'Redis', 'RabbitMQ', 'ElasticSearch'],
        markdown: `
# Test
        `,
    },
    {
        // logo: 'https://icon.icepanel.io/Technology/svg/RabbitMQ.svg',
        title: 'RabbitMQ Consumer Backend of 0725',
        description: 'RabbitMQ Consumer Microservice for 0725 Community(Forum) Project',
        period: '25.07.25 ~',
        link: '/projects/0725-rabbitmq-consumer',
        github: 'https://github.com/0725-project/rabbitmq-consumer',
        homePin: false,
        tags: ['TypeScript', 'NestJS', 'RabbitMQ'],
        detailTags: ['Backend', 'TypeScript', 'NestJS', 'RabbitMQ'],
        markdown: `
# Test
        `,
    },
    {
        // logo: 'https://icon.icepanel.io/Technology/png-shadow-512/Next.js.png',
        title: 'Frontend of 0725',
        description: 'Frontend of 0725 Community(Forum) Project',
        period: '25.07.25 ~',
        link: '/projects/0725-frontend',
        github: 'https://github.com/0725-project/frontend',
        // homePin: true,
        tags: ['TypeScript', 'NextJS', 'React'],
        detailTags: ['Frontend', 'TypeScript', 'NextJS', 'React', 'TailwindCSS', 'React-Query'],
        markdown: `
# Test
        `,
    },
    {
        // logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png',
        title: '조선인사이드',
        description: '세명컴퓨터고등학교 유연화주간 융합 수업 프로젝트',
        period: '25.07.10 ~ 25.07.14',
        link: '/projects/chosun',
        github: 'https://github.com/yulmwu/smc-project-25-07',
        homePin: false,
        tags: ['TypeScript', 'NestJS', 'React', 'AWS'],
        markdown: `# 조선인사이드
테스트
`,
    },
    {
        // logo: 'https://cdn.iconscout.com/icon/free/png-256/free-jekyll-logo-icon-download-in-svg-png-gif-file-formats--company-brand-world-logos-vol-12-pack-icons-283293.png',
        title: 'OriginalKim Blog',
        description: '#1 Personal Tech Blog (Legacy)',
        period: '~ 25.05.08',
        link: '/projects/originalkim',
        github: 'https://github.com/originalkim/originalkim.github.io',
        tags: ['Jekyll', 'GitHub Pages'],
        markdown: `# OriginalKim Blog
테스트
`,
    },
    {
        // logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/1024px-Rust_programming_language_black_logo.svg.png',
        title: 'Swua Programming Language',
        description: 'Toy programming language using LLVM',
        period: '23.10.08 ~ 24.04.19',
        link: '/projects/swua',
        github: 'https://github.com/yulmwu/swua',
        homePin: true,
        tags: ['Rust', 'LLVM'],
        markdown: `# Swua Programming Language
테스트
`,
    },
    {
        // logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/1024px-Rust_programming_language_black_logo.svg.png',
        title: '6502 Emulator',
        description: 'MOS Technology 6502 Emulator & Assembler (WIP)',
        period: '23.07.2 ~ 23.11.20',
        link: '/projects/6502',
        github: 'https://github.com/yulmwu/6502',
        homePin: true,
        tags: ['Rust'],
        markdown: `# 6502 Emulator
테스트
`,
    },
    {
        // logo: 'https://cdn-icons-png.flaticon.com/512/6132/6132222.png',
        title: 'USwua C++',
        description: 'USwua bytecode C++ porting',
        period: '24.08.15 ~ 25.01.02',
        link: '/projects/swua-cpp',
        github: 'https://github.com/yulmwu/uswua-cpp',
        tags: ['C++'],
        markdown: `# USwua C++
테스트
`,
    },
    {
        // logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png',
        title: 'Type',
        description: 'Type Level programming with TypeScript',
        period: '22.03.26 ~ 22.09.10',
        link: '/projects/type',
        github: 'https://github.com/yulmwu/type',
        tags: ['TypeScript'],
        markdown: `# Type
테스트
`,
    },
    {
        // logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png',
        title: 'Portfolio Website',
        description: 'Personal Portfolio Website',
        period: '22.03.26 ~ 22.09.10',
        link: '/projects/portfolio',
        github: 'https://github.com/yulmwu/yulmwu.github.io',
        tags: ['React', 'TypeScript'],
        // homePin: true,
        markdown: `# Portfolio Website
테스트
`,
    },
    {
        title: 'Blog Example Demos',
        description: 'Velog @yulmwu Blog Example Demos',
        period: '25.01.01 ~',
        link: '/projects/blog-example-demo',
        github: 'https://github.com/yulmwu/blog-example-demo',
        tags: ['Blog'],
        // homePin: true,
        markdown: `# Blog Example Demos
테스트
`,
    },
    {
        title: 'AWS Click Heatmap (PoC/MVP)',
        description: 'UI/UX Click Heatmap with AWS KDS, MSF, Glue, and Athena Pipeline',
        period: '26.12.30',
        link: '/projects/aws-click-heatmap',
        github: 'https://github.com/yulmwu/aws-click-heatmap-demo',
        tags: ['AWS', 'Terraform', 'Serverless'],
        // homePin: true,
        markdown: `# AWS Click Heatmap (PoC/MVP)
테스트
`,
    },
]

export const projects: Project[] = projectsRaw
    .filter((project) => project.homePin)
    .concat(projectsRaw.filter((project) => !project.homePin))
