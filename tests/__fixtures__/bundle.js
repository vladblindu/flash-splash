(function () {
    'use strict';

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


    const CLEANUP_DELAY = 200;
    const MIN_SHOW_TIME = 1000;
    const TRANSITION_TIME = 2000;

    var CLEANUP_DELAY_1 = CLEANUP_DELAY;
    var MIN_SHOW_TIME_1 = MIN_SHOW_TIME;
    var TRANSITION_TIME_1 = TRANSITION_TIME;

    var DEFAULT_OPTS = {
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
    };

    var constants = {
    	CLEANUP_DELAY: CLEANUP_DELAY_1,
    	MIN_SHOW_TIME: MIN_SHOW_TIME_1,
    	TRANSITION_TIME: TRANSITION_TIME_1,
    	DEFAULT_OPTS: DEFAULT_OPTS
    };

    const {DEFAULT_OPTS: DEFAULT_OPTS$1} = constants;

    var toCss = time => (time / 1000).toString() + 's';

    var getTime = () => {
        try {
            return performance.now()
        } catch {
            return new Date()
        }
    };

    var mergeOpts = (opts, defaultOpts = DEFAULT_OPTS$1) => {
        if (!opts || !Object.keys(opts).length)
            return defaultOpts
        return Object.keys(defaultOpts).reduce(
            (acc, k) => {
                if (typeof opts[k] !== 'object')
                    acc[k] = opts[k] || defaultOpts[k];
                else
                    acc[k] = {...defaultOpts[k], ...opts[k]};
                return acc
            }, {})
    };

    /**
     * @class FlashSplash
     */

    class FlashSplash {

        /**
         * @constructor
         * @param opts
         */
        constructor(opts = {}) {

            const _opts = mergeOpts(opts);
            this._transitionTime = _opts.transitionTime;
            this._minShowTime = _opts.minShowTime; 
            this._cleanupDelay = _opts.cleanupDelay;
            this._startTime = getTime();

            // initialize or create the base html elements
            this.splash = document.getElementById('splash') || document.createElement('div');
            const hasRoot = document.getElementById('root');
            if(!hasRoot) this.root = document.createElement('div');
            else this.root = hasRoot;

            // setup the splash element
            this.splash.id = 'splash';
            this.splash.innerHTML = _opts.splash.innerHTML;
            this.splash.style.cssText = `position:absolute;top:0;left:0;width:vw;height:vh;display:flex;justify-items:center;align-items:center; overflow:hidden;opacity:1;transition:opacity ${toCss(this._transitionTime)};` + _opts.splash.cssText;

            const splashContent = document.createElement('div');
            splashContent.style.cssText = 'position:relative;margin:auto;' + _opts.splashContent.cssText;

            if(_opts.splashContent.img){
                splashContent.style.cssText += 'background-repeat:no-repeat;background-position:center;background-size:cover;';
                splashContent.style.backgroundImage = `url("${_opts.splashContent.img}")`;
            }

            this.splash.appendChild(splashContent);

            document.body.appendChild(this.splash);

            if(!this.root.id) this.root.id = 'root';
            this.root.innerHTML = _opts.root.innerHTML;
            this.root.style.cssText = 'display: none; opacity: 0; transition: opacity ' +
                `${toCss(this._transitionTime)};` + _opts.root.cssText;

            if(!hasRoot)
                document.body.appendChild(this.root);

            this.ready = this.ready.bind(this);
            this._onReady = this._onReady.bind(this);
        }

        _hideSplash() {
            this.splash.style.opacity = '0';
        }

        _showRoot() {
            this.root.style.display = 'block';
            this.root.style.opacity = '1';
            this.root.style.transform = 'none';
        }

        _cleanup() {
            setTimeout(() => {
                //splash.style.display = 'none'
                this.splash.parentNode.removeChild(this.splash);
            }, this._transitionTime + this._cleanupDelay);
        }

        _onReady() {
            this._showRoot();
            this._hideSplash();
            this._cleanup();
        }

        ready() {
            const timeElapsed = getTime() - this._startTime;
            if (timeElapsed > this._minShowTime) this._onReady();
            else setTimeout(this._onReady, this._minShowTime - timeElapsed);
        }
    }

    var src = opts => {
        const flashSplash = new FlashSplash(opts);
        Object.freeze(flashSplash);
        return flashSplash
    };

    const flashSplash = src({
        splashContent: {
            cssText: 'width:300px;height:300px',
            innerHTML: '',
            img: './test-image.jpg'
        },
        root: {
            innerHTML: '<div style="color: white; font-size: 30px; padding:20px; background-color: red;">ROOT</div>'
        }
    });

    const btn = document.createElement('button');
    const splash = document.getElementById('splash');

    btn.id = 'btn';
    btn.innerText = 'READY';

    btn.addEventListener('click', () => {
        flashSplash.ready();
    });

    splash.appendChild(btn);

}());
