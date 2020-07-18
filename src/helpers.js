const {DEFAULT_OPTS} = require('./constants')

module.exports.toCss = time => (time / 1000).toString() + 's'

module.exports.getTime = () => {
    try {
        return performance.now()
    } catch {
        return new Date()
    }
}

module.exports.mergeOpts = (opts, defaultOpts = DEFAULT_OPTS) => {
    if (!opts || !Object.keys(opts).length)
        return defaultOpts
    return Object.keys(defaultOpts).reduce(
        (acc, k) => {
            if (typeof opts[k] !== 'object')
                acc[k] = opts[k] || defaultOpts[k]
            else
                acc[k] = {...defaultOpts[k], ...opts[k]}
            return acc
        }, {})
}