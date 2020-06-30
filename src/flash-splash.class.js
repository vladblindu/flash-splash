/**
 * @typedef {object} elem
 * @param {string?} elem.cssText
 * @param {string?} elem.innerHtml
 * @param {string?} elem.img
 */


/**
 * @typedef {object} opts
 * @param {number} opts.minShowTime - defaults to 1000ms
 * @param {elem} opts.splash
 * @param {elem} opts.root
 * @param {elem} opts.splashContent
 */

const {CLEANUP_DELAY, TRANSITION_TIME, MIN_SHOW_TIME} = require('./constants')
const {toCss, getTime} = require('./helpers')

const DEFAULT_OPTS = {
    minShowTime: MIN_SHOW_TIME,
    splash: {
        cssText: '',
        innerHtml: ''
    },
    splashContent: {
        cssText: '',
        innerHtml: '',
        img: ''
    },
    root: {
        cssText: '',
        innerHtml: ''
    }
}

/**
 * @class FlashSplash
 */

class FlashSplash {

    /**
     * @constructor
     * @param opts
     */
    constructor(opts = DEFAULT_OPTS) {

        this._minShowTime = opts.minShowTime
        this.transitionTime = opts.transitionTime || TRANSITION_TIME
        this.cleanupDelay = opts.cleanupDelay || CLEANUP_DELAY
        this._startTime = getTime()

        // initialize or create the base html elements
        this.splash = document.getElementById('splash') || document.createElement('div')
        this.root = document.getElementById('root') || document.createElement('div')

        // setup the splash element
        this.splash.id = 'splash'
        this.splash.innerHtml = opts.splash.innerHtml
        this.splash.style.cssText = `position:absolute;top:0;left:0;width:100%;height:100%;' +
            ';display:flex;justify-items:center;align-items:center;' +
            'overflow:hidden;opacity:1;transition:opacity ${toCss(this.transitionTime)};` + opts.splash.cssText

        const splashContent = document.createElement('div')
        splashContent.style.cssText = 'background-repeat:no-repeat;background-position:center;background-size:cover;' +
            'position:relative;margin:auto;' + opts.splashContent.cssText
        splashContent.style.backgroundImage = `url("${opts.splashContent.img}")`

        this.splash.appendChild(splashContent)

        document.body.appendChild(this.splash)

        this.root.id = 'root'
        this.root.innerHtml = opts.root.innerHtml
        this.root.style.cssText = 'display: none; opacity: 0; transition: opacity ' +
            `${toCss(this.transitionTime)};` + opts.root.cssText
        document.body.appendChild(this.root)
    }

    _hideSplash() {
        this.splash.style.opacity = '0'
    }

    _showRoot() {
        this.root.style.display = 'block'
        this.root.style.opacity = '1'
        this.root.style.transform = 'none'
    }

    _cleanup() {
        setTimeout(() => {
            //splash.style.display = 'none'
            this.splash.parentNode.removeChild(this.splash)
        }, this.transitionTime + this.cleanupDelay)
    }

    _onReady() {
        this._showRoot()
        this._hideSplash()
        this._cleanup()
    }

    _ready() {
        const timeElapsed = getTime() - this._startTime
        if (timeElapsed > this._minShowTime) this._onReady()
        else setTimeout(this._onReady, this._minShowTime - timeElapsed)
    }
}

module.exports = FlashSplash