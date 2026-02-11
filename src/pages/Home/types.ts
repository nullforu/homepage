export type BgPreset = {
    gridSize: number
    gridAlpha: number
    gridX: number
    gridY: number

    hatchSize: number
    hatchAlpha: number
    hatchThickness: number

    dotSize: number
    dotAlpha: number
    dotR: number
    dotX: number
    dotY: number

    glowX: number
    glowY: number
    glowAlpha: number

    scale: number
    rot: number
    skewX: number
}

export type SectionWrapProps = {
    children: React.ReactNode
    heightClassName?: string
    disableSticky?: boolean
    id?: string
}
