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

module.exports.CLEANUP_DELAY = 200
module.exports.MIN_SHOW_TIME = 1000
module.exports.TRANSITION_TIME = 2000
module.exports.DEFAULT_OPTS = {
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
