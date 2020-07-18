const {toCss, getTime, mergeOpts} = require('./helpers')

/**
 * @class FlashSplash
 */

class FlashSplash {

    /**
     * @constructor
     * @param opts
     */
    constructor(opts = {}) {

        const _opts = mergeOpts(opts)
        this._transitionTime = _opts.transitionTime
        this._minShowTime = _opts.minShowTime 
        this._cleanupDelay = _opts.cleanupDelay
        this._startTime = getTime()

        // initialize or create the base html elements
        this.splash = document.getElementById('splash') || document.createElement('div')
        this.root = document.getElementById('root') || document.createElement('div')

        // setup the splash element
        this.splash.id = 'splash'
        this.splash.innerHTML = _opts.splash.innerHTML
        this.splash.style.cssText = `position:absolute;top:0;left:0;width:vw;height:vh;display:flex;justify-items:center;align-items:center; overflow:hidden;opacity:1;transition:opacity ${toCss(this._transitionTime)};` + _opts.splash.cssText

        const splashContent = document.createElement('div')
        splashContent.style.cssText = 'background-repeat:no-repeat;background-position:center;background-size:cover;position:relative;margin:auto;' + _opts.splashContent.cssText
        splashContent.style.backgroundImage = `url("${_opts.splashContent.img}")`

        this.splash.appendChild(splashContent)

        document.body.appendChild(this.splash)

        this.root.id = 'root'
        this.root.innerHTML = _opts.root.innerHTML
        this.root.style.cssText = 'display: none; opacity: 0; transition: opacity ' +
            `${toCss(this._transitionTime)};` + _opts.root.cssText
        document.body.appendChild(this.root)

        this.ready = this.ready.bind(this)
        this._onReady = this._onReady.bind(this)
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
        }, this._transitionTime + this._cleanupDelay)
    }

    _onReady() {
        this._showRoot()
        this._hideSplash()
        this._cleanup()
    }

    ready() {
        const timeElapsed = getTime() - this._startTime
        if (timeElapsed > this._minShowTime) this._onReady()
        else setTimeout(this._onReady, this._minShowTime - timeElapsed)
    }
}

module.exports = FlashSplash