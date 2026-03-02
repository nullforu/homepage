import { useState } from 'react'
import { projects, statusMap } from '../../Projects'

type ProjectsSectionProps = {
    disableSticky?: boolean
}

export function ProjectsSection({ disableSticky = false }: ProjectsSectionProps) {
    const [openIds, setOpenIds] = useState<number[]>([])

    const toggle = (id: number) => {
        setOpenIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]))
    }

    return (
        <section
            className={`${disableSticky ? '' : 'sticky top-0'} flex min-h-screen w-full items-center px-0 py-16 md:py-0`}
            data-scroll-section
            data-bg='projects'
        >
            <div className='mx-auto w-full max-w-5xl px-6 sm:px-12 md:px-16 lg:px-20 xl:max-w-6xl' data-scroll-content>
                <p className='text-xs uppercase tracking-[0.35em] text-slate-500'>Projects</p>

                <h2 className='mt-6 text-3xl font-bold text-slate-900 md:text-5xl'>프로젝트</h2>

                <div className='mt-16 grid gap-14 md:grid-cols-2'>
                    {projects.map((project, index) => {
                        const isOpen = openIds.includes(project.id)

                        return (
                            <div key={project.id} className='space-y-4'>
                                <div
                                    className={`group ${project.link ? 'cursor-pointer' : ''}`}
                                    onClick={() => {
                                        if (project.link) window.open(project.link, '_blank')
                                    }}
                                >
                                    <div className='flex items-center gap-3 flex-wrap'>
                                        <span className='text-xs tracking-[0.3em] text-slate-400'>
                                            {(index + 1).toString().padStart(2, '0')}
                                        </span>

                                        <h3 className='text-lg font-semibold text-slate-900 group-hover:underline'>
                                            {project.title}
                                        </h3>

                                        <span className='text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600'>
                                            {statusMap[project.status]?.label || project.status}
                                        </span>

                                        {project.subProjects && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    toggle(project.id)
                                                }}
                                                className='ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition'
                                            >
                                                <span
                                                    className={`text-lg leading-none transition-transform ${
                                                        isOpen ? 'rotate-45' : ''
                                                    }`}
                                                >
                                                    +
                                                </span>
                                            </button>
                                        )}
                                    </div>

                                    <p className='mt-3 text-sm text-slate-600 line-clamp-2'>{project.description}</p>

                                    {project.tags && (
                                        <div className='mt-3 flex flex-wrap gap-2'>
                                            {project.tags.slice(0, 4).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className='text-[10px] px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-500'
                                                >
                                                    {tag}
                                                </span>
                                            ))}

                                            {project.tags.length > 4 && (
                                                <span className='text-[10px] text-slate-400'>
                                                    +{project.tags.length - 4}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* SubProjects */}
                                {project.subProjects && isOpen && (
                                    <div className='ml-4 border-l border-slate-200 pl-5 space-y-6 pt-2'>
                                        {project.subProjects.map((sub) => (
                                            <div
                                                key={sub.id}
                                                className={`group ${sub.link ? 'cursor-pointer' : ''}`}
                                                onClick={() => {
                                                    if (sub.link) window.open(sub.link, '_blank')
                                                }}
                                            >
                                                <div className='flex items-center gap-2 flex-wrap'>
                                                    <h4 className='text-sm font-semibold text-slate-800 group-hover:underline'>
                                                        {sub.title}
                                                    </h4>

                                                    <span className='text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500'>
                                                        {sub.status}
                                                    </span>
                                                </div>

                                                <p className='mt-2 text-xs text-slate-600 line-clamp-2'>
                                                    {sub.description}
                                                </p>

                                                {sub.tags && (
                                                    <div className='mt-3 flex flex-wrap gap-2'>
                                                        {sub.tags.slice(0, 4).map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className='text-[10px] px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-500'
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}

                                                        {sub.tags.length > 4 && (
                                                            <span className='text-[10px] text-slate-400'>
                                                                +{sub.tags.length - 4}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
