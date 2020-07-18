const {DEFAULT_OPTS} = require('./constants')

export const toCss = time => (time / 1000).toString() + 's'

export const getTime = () => {
    try {
        return performance.now()
    } catch {
        return new Date()
    }
}

export const mergeOpts = (opts, defaultOpts = DEFAULT_OPTS) => {
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