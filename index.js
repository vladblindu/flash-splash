const FLASH_SPLASH = '__FLASH_SPLASH__'
const SPLASH_TIME = 1000
const CLEANUP_TIME = 200


const defaultSplashOpts = {
    cssText: '',
    innerHtml: ''
}

const defaultSplashContentOpts = {
    cssText: '',
    innerHtml: '',
    img: ''
}

const defaultRootOpts = {
    cssText: '',
    innerHtml: ''
}


const baseElements = opts => {
    // create a div element

    // initialize or create the base html elements
    const splash = document.getElementById('splash') || document.createElement('div')
    const root = document.getElementById('root') || document.createElement('div')

    splash.id = 'splash'
    splash.innerHtml = opts.splash.innerHtml
    splash.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;' +
        ';display:flex;justify-items:center;align-items:center;' +
        'overflow:hidden;opacity:1;transition:opacity 1s;' + opts.splash.cssText

    const splashContent = document.createElement('div')
    splashContent.style.cssText = 'background-repeat:no-repeat;background-position:center;background-size:cover;' +
        'position:relative;margin:auto;' + opts.splashContent.cssText
    splashContent.style.backgroundImage = `url("${opts.splashContent.img}")`

    splash.appendChild(splashContent)

    document.body.appendChild(splash)

    root.id = 'root'
    root.innerHtml = opts.root.innerHtml
    root.style.cssText = 'display: none; opacity: 0; transition: opacity 1s;' + opts.root.cssText
    document.body.appendChild(root)

    return [splash, root]
}

const hideSplash = splash => {
    splash.style.opacity = '0'
}

const showRoot = root => {
    root.style.display = 'block'
    root.style.opacity = '1'
    root.style.transform = 'none'
}

const cleanup = (win, splash, cleanupTime) => {
    setTimeout(() => {
        //splash.style.display = 'none'
        splash.parentNode.removeChild(splash)
        delete win[FLASH_SPLASH]
    }, cleanupTime)
}

const flashSplash = (win, _opts) => {

    const opts = {}
    if (!_opts.splash) opts.splash = defaultSplashOpts
    else opts.splash = {...defaultSplashOpts, ..._opts.splash}

    if (!_opts.splashContent) opts.splashContent = defaultSplashContentOpts
    else opts.splashContent = {...defaultSplashContentOpts, ..._opts.splashContent}

    if (!_opts.root) opts.root = defaultRootOpts
    else opts.root = {...defaultRootOpts, ..._opts.root}


    // wait for the isAuthenticated dispatch call to trigger the re-render
    const [splash, root] = baseElements(opts)

    setTimeout(() => {
        // enable the app (display: block) with fade in
        // and disable the splash screen with fade out
        showRoot(root)
        hideSplash(splash)
        //wait for the fade animations to finish
        // and remove both the splash element and __flashSplash variable
        cleanup(win, splash, opts['cleanupTime'] || CLEANUP_TIME)
    }, opts['splashTime'] || SPLASH_TIME)
}

export default (win, img) => {
        win[FLASH_SPLASH] = flashSplash
        win[FLASH_SPLASH](win, img)
    }