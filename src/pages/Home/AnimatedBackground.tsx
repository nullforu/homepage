type AnimatedBackgroundProps = {
    gridRef: React.RefObject<HTMLDivElement>
    geoRef: React.RefObject<HTMLDivElement>
}

export const AnimatedBackground = ({ gridRef, geoRef }: AnimatedBackgroundProps) => {
    const gridStyle = {
        ['--gridSize' as any]: '98px',
        ['--gridAlpha' as any]: 0.045,
        ['--gridX' as any]: '2px',
        ['--gridY' as any]: '1px',

        ['--glowX' as any]: '54%',
        ['--glowY' as any]: '30%',
        ['--glowAlpha' as any]: 0.08,

        ['--bgScale' as any]: 1.01,
        ['--bgRot' as any]: '-0.10deg',
        ['--bgSkewX' as any]: '0.04deg',

        ['--driftX' as any]: '0px',
        ['--driftY' as any]: '0px',
        ['--rotJitter' as any]: '0deg',
        ['--skewJitter' as any]: '0deg',

        ['--mouseX' as any]: '0px',
        ['--mouseY' as any]: '0px',
        ['--mouseRot' as any]: '0deg',
        ['--mouseSkew' as any]: '0deg',
        ['--mouseXGrid' as any]: '0px',
        ['--mouseYGrid' as any]: '0px',

        backgroundImage: [
            'linear-gradient(rgba(15 23 42 / var(--gridAlpha)) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(15 23 42 / var(--gridAlpha)) 1px, transparent 1px)',
            'radial-gradient(700px 500px at var(--glowX) var(--glowY), rgba(15 23 42 / var(--glowAlpha)), transparent 60%)',
        ].join(', '),

        backgroundSize: ['var(--gridSize) var(--gridSize)', 'var(--gridSize) var(--gridSize)', 'auto'].join(', '),

        backgroundPosition: [
            'calc(var(--gridX) + var(--driftX) + var(--mouseXGrid)) calc(var(--gridY) + var(--driftY) + var(--mouseYGrid))',
            'calc(var(--gridX) + var(--driftX) + var(--mouseXGrid)) calc(var(--gridY) + var(--driftY) + var(--mouseYGrid))',
            '0 0',
        ].join(', '),

        transform:
            'translate(var(--mouseX), var(--mouseY)) ' +
            'scale(var(--bgScale)) ' +
            'rotate(calc(var(--bgRot) + var(--rotJitter) + var(--mouseRot))) ' +
            'skew(calc(var(--bgSkewX) + var(--skewJitter) + var(--mouseSkew)), 0deg)',
        transformOrigin: '50% 50%',
        willChange: 'transform, background-position, filter',
    } as React.CSSProperties

    const geoStyle = {
        ['--hatchSize' as any]: '48px',
        ['--hatchAlpha' as any]: 0.055,
        ['--hatchThickness' as any]: '1.2px',

        ['--dotSize' as any]: '24px',
        ['--dotAlpha' as any]: 0.065,
        ['--dotR' as any]: '1.25px',
        ['--dotX' as any]: '1px',
        ['--dotY' as any]: '1px',

        ['--bgScale' as any]: 1.01,
        ['--bgRot' as any]: '-0.10deg',
        ['--bgSkewX' as any]: '0.04deg',

        ['--driftX' as any]: '0px',
        ['--driftY' as any]: '0px',
        ['--rotJitter' as any]: '0deg',
        ['--skewJitter' as any]: '0deg',

        ['--mouseX' as any]: '0px',
        ['--mouseY' as any]: '0px',
        ['--mouseRot' as any]: '0deg',
        ['--mouseSkew' as any]: '0deg',

        ['--mouseXGeoHatch' as any]: '0px',
        ['--mouseYGeoHatch' as any]: '0px',
        ['--mouseXGeoDot' as any]: '0px',
        ['--mouseYGeoDot' as any]: '0px',

        ['--mouseXGeoT' as any]: '0px',
        ['--mouseYGeoT' as any]: '0px',
        ['--mouseRotGeo' as any]: '0deg',
        ['--mouseSkewGeo' as any]: '0deg',

        backgroundImage: [
            'repeating-linear-gradient(45deg, rgba(15 23 42 / var(--hatchAlpha)) 0 var(--hatchThickness), transparent var(--hatchThickness) var(--hatchSize))',
            'radial-gradient(circle, rgba(15 23 42 / var(--dotAlpha)) 0 var(--dotR), transparent calc(var(--dotR) + 0.7px))',
        ].join(', '),

        backgroundSize: ['auto', 'var(--dotSize) var(--dotSize)'].join(', '),

        backgroundPosition: [
            'calc(var(--driftX) * 0.6 + var(--mouseXGeoHatch)) calc(var(--driftY) * 0.6 + var(--mouseYGeoHatch))',
            'calc(var(--dotX) + var(--driftX) + var(--mouseXGeoDot)) calc(var(--dotY) + var(--driftY) + var(--mouseYGeoDot))',
        ].join(', '),

        transform:
            'translate(var(--mouseXGeoT), var(--mouseYGeoT)) ' +
            'scale(var(--bgScale)) ' +
            'rotate(calc(var(--bgRot) + var(--rotJitter) + var(--mouseRotGeo))) ' +
            'skew(calc(var(--bgSkewX) + var(--skewJitter) + var(--mouseSkewGeo)), 0deg)',
        filter: 'none',
        transformOrigin: '50% 50%',
        willChange: 'transform, background-position',
        opacity: 1,
    } as React.CSSProperties

    return (
        <div className='pointer-events-none fixed inset-0 -z-10'>
            <div ref={gridRef} className='absolute inset-0' style={gridStyle} />
            <div ref={geoRef} className='absolute inset-0' style={geoStyle} />
        </div>
    )
}
