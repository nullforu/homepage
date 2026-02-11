import { BgPreset } from './types'

export const BG_PRESETS: Record<string, BgPreset> = {
    hero: {
        gridSize: 98,
        gridAlpha: 0.045,
        gridX: 2,
        gridY: 1,

        hatchSize: 48,
        hatchAlpha: 0.045,
        hatchThickness: 1.2,

        dotSize: 24,
        dotAlpha: 0.065,
        dotR: 1.25,
        dotX: 1,
        dotY: 1,

        glowX: 54,
        glowY: 30,
        glowAlpha: 0.08,

        scale: 1.01,
        rot: -0.1,
        skewX: 0.04,
    },
    about: {
        gridSize: 104,
        gridAlpha: 0.04,
        gridX: -2,
        gridY: 2,

        hatchSize: 52,
        hatchAlpha: 0.04,
        hatchThickness: 1.15,

        dotSize: 26,
        dotAlpha: 0.06,
        dotR: 1.25,
        dotX: -1,
        dotY: 2,

        glowX: 50,
        glowY: 34,
        glowAlpha: 0.07,

        scale: 1.005,
        rot: 0.08,
        skewX: -0.03,
    },
    projects: {
        gridSize: 86,
        gridAlpha: 0.055,
        gridX: -2,
        gridY: 1,

        hatchSize: 46,
        hatchAlpha: 0.045,
        hatchThickness: 1.2,

        dotSize: 22,
        dotAlpha: 0.07,
        dotR: 1.2,
        dotX: 1,
        dotY: -1,

        glowX: 58,
        glowY: 32,
        glowAlpha: 0.075,

        scale: 1.008,
        rot: -0.07,
        skewX: 0.03,
    },
    curriculum: {
        gridSize: 92,
        gridAlpha: 0.048,
        gridX: 2,
        gridY: -1,

        hatchSize: 50,
        hatchAlpha: 0.04,
        hatchThickness: 1.15,

        dotSize: 24,
        dotAlpha: 0.062,
        dotR: 1.25,
        dotX: 1,
        dotY: 1,

        glowX: 48,
        glowY: 26,
        glowAlpha: 0.065,

        scale: 1.004,
        rot: 0.09,
        skewX: -0.03,
    },
    recruitment: {
        gridSize: 96,
        gridAlpha: 0.045,
        gridX: 1,
        gridY: -2,

        hatchSize: 48,
        hatchAlpha: 0.042,
        hatchThickness: 1.15,

        dotSize: 24,
        dotAlpha: 0.062,
        dotR: 1.25,
        dotX: -1,
        dotY: 1,

        glowX: 54,
        glowY: 30,
        glowAlpha: 0.07,

        scale: 1.006,
        rot: -0.08,
        skewX: 0.03,
    },
}

export const MOUSE_PARALLAX_CONFIG = {
    strengthPx: 40.0,
    rotStrengthDeg: 0.25,
    skewStrengthDeg: 0.2,
    lerp: 0.12,
}

export const KEYBOARD_NAV_CONFIG = {
    cooldownMs: 600,
    scrollDuration: 1.05,
}
