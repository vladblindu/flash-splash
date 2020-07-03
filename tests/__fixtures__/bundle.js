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
    const DEFAULT_OPTS = {
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

    const toCss = time => (time / 1000).toString() + 's';
    const getTime = () => {
      try {
        return performance.now();
      } catch {
        return new Date();
      }
    };
    const mergeOpts = (opts, defaultOpts = DEFAULT_OPTS) => {
      if (!opts || !Object.keys(opts).length) return defaultOpts;
      return Object.keys(defaultOpts).reduce((acc, k) => {
        if (typeof opts[k] !== 'object') acc[k] = opts[k] || defaultOpts[k];else acc[k] = { ...defaultOpts[k],
          ...opts[k]
        };
        return acc;
      }, {});
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
        this._startTime = getTime(); // initialize or create the base html elements

        this.splash = document.getElementById('splash') || document.createElement('div');
        this.root = document.getElementById('root') || document.createElement('div'); // setup the splash element

        this.splash.id = 'splash';
        this.splash.innerHTML = _opts.splash.innerHTML;
        this.splash.style.cssText = `position:absolute;top:0;left:0;width:vw;height:vh;display:flex;justify-items:center;align-items:center; overflow:hidden;opacity:1;transition:opacity ${toCss(this._transitionTime)};` + _opts.splash.cssText;
        const splashContent = document.createElement('div');
        splashContent.style.cssText = 'background-repeat:no-repeat;background-position:center;background-size:cover;position:relative;margin:auto;' + _opts.splashContent.cssText;
        splashContent.style.backgroundImage = `url("${_opts.splashContent.img}")`;
        this.splash.appendChild(splashContent);
        document.body.appendChild(this.splash);
        this.root.id = 'root';
        this.root.innerHTML = _opts.root.innerHTML;
        this.root.style.cssText = 'display: none; opacity: 0; transition: opacity ' + `${toCss(this._transitionTime)};` + _opts.root.cssText;
        document.body.appendChild(this.root);
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

        if (timeElapsed > this._minShowTime) this._onReady();else setTimeout(this._onReady, this._minShowTime - timeElapsed);
      }

    }

    var getFlashSplash = (opts => {
      const flashSplash = new FlashSplash(opts);
      Object.freeze(flashSplash);
      return flashSplash;
    });

    const flashSplash = getFlashSplash({
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
