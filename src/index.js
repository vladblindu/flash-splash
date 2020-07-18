const FlashSplash =require('./flash-splash.class')

module.exports = opts => {
    const flashSplash = new FlashSplash(opts)
    Object.freeze(flashSplash)
    return flashSplash
}