import FlashSplash from './flash-splash.class'

export default opts => {
    const flashSplash = new FlashSplash(opts)
    Object.freeze(flashSplash)
    return flashSplash
}