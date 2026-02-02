import { useEffect, useRef, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'

export const Title = () => {
    const [isVisible, setIsVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting)
            },
            {
                root: null,
                threshold: 0.1,
            }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current)
            }
        }
    }, [])

    return (
        <div ref={containerRef}>
            {isVisible ? (
                <TypeAnimation
                    sequence={[
                        '세명컴퓨터고등학교 학생입니다.',
                        1200,
                        'DevOps와 클라우드 네이티브를 지향하고',
                        1500,
                        '완벽주의와 책임감 있는, 그리고 도움을 주는 것을 좋아하는 INFJ 입니다.',
                        2500,
                    ]}
                    wrapper='span'
                    cursor={true}
                    repeat={Infinity}
                    deletionSpeed={50}
                />
            ) : (
                <span>세명컴퓨터고등학교 학생입니다.</span>
            )}
        </div>
    )
}
