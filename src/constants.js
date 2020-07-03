/**
 * @typedef {object} elem
 * @param {string?} elem.cssText
 * @param {string?} elem.innerHTML
 * @param {string?} elem.img
 */

/**
 * @typedef {object} opts
 * @param {number} opts.minShowTime - defaults to 1000ms
 * @param {number} opts.transitionTime - defaults to 500ms
 * @param {elem} opts.splash
 * @param {elem} opts.root
 * @param {elem} opts.splashContent
 */

export const CLEANUP_DELAY = 200
export const MIN_SHOW_TIME = 1000
export const TRANSITION_TIME = 2000
export const DEFAULT_OPTS = {
    minShowTime: MIN_SHOW_TIME,
    cleanupDelay: CLEANUP_DELAY,
    transitionTime: TRANSITION_TIME,
    splash: {
        cssText: '',
        innerHTML: ''
    },
    splashContent: {
        cssText: '',
        innerHTML: '',
        img: ''
    },
    root: {
        cssText: '',
        innerHTML: ''
    }
}
