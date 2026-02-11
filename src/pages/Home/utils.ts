export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export const unique = <T>(arr: T[]) => Array.from(new Set(arr))

export const isTypingElement = (el: Element | null) => {
    if (!(el instanceof HTMLElement)) return false
    if (el.isContentEditable) return true
    const tag = el.tagName
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'
}
