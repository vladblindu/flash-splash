const toCss = time => (time / 1000).toString() + 's'

const getTime = () => performance && performance.now
    ? performance.now()
    : new Date()

module.exports = {
    toCss,
    getTime
}