const {expect} = require('chai')
require('jsdom-global')()
import FlashSplash from '../src/flash-splash.class'
import {toCss, getTime, mergeOpts} from '../src/helpers'

describe('Flash-splash helpers unit tests', () => {

    describe('toCss', () => {

        it('Should return a valid time in seconds as a string', () => {
            expect(toCss(2500)).to.equal('2.5s')
        })
    })

    describe('getTime', () => {

        it('Should return a value grater than the delay', () => {
            const start = getTime()
            setTimeout(() => {
                expect(getTime() - start).to.be.greaterThan(1000)
            }, 1000)
        })

        it('Should be equal ', () => {
            const start = getTime()
            expect(getTime() - start).to.not.be.lessThan(0)
        })
    })

    describe('FlashSplash', () => {

        const sleep = ms => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        it('Should calculate the show interval', async () => {
            const flashSplash = new FlashSplash()
            const start = getTime()
            flashSplash._onReady = () => {
                const now = getTime()
                expect(now - start).to.be.below(500)
            }
            await sleep(500)
            flashSplash.ready()
        })
    })
    describe('mergeOpts', () => {

        const DUMMY_NUMBER = 500
        const DUMMY_NUMBER_MRG = 1000
        const DUMMY_STRING = 'dummy-string'
        const DUMMY_STRING_MRG = 'dummy-string-mrg'

        const defaultTestOpts = {
            numberKey: DUMMY_NUMBER,
            stingKey: DUMMY_STRING,
            objectKey1:{
                dummyVal11: DUMMY_STRING,
                dummyVal12: DUMMY_NUMBER
            },
            objectKey2:{
                dummyVal21: DUMMY_STRING,
                dummyVal22: DUMMY_NUMBER
            }
        }

        it('Should return defaults on null entry', () => {
            const actual = mergeOpts(null, defaultTestOpts)
            expect(actual).to.deep.equal(defaultTestOpts)
        })

        it('Should return defaults on empty entry', () => {
            const actual = mergeOpts({}, defaultTestOpts)
            expect(actual).to.deep.equal(defaultTestOpts)
        })

        it('Should return the right merged opts', () => {

            const testOpts = {
                mrgStringKey: DUMMY_STRING_MRG,
                numberKey: DUMMY_NUMBER_MRG,
                objectKey1:{
                    dummyVal11: DUMMY_STRING,
                    dummyVal12: DUMMY_NUMBER_MRG
                },
                objectKey3:{
                    dummyVal31: DUMMY_STRING_MRG,
                    dummyVal32: DUMMY_NUMBER_MRG
                }
            }

            const expected = {
                numberKey: DUMMY_NUMBER_MRG,
                stingKey: DUMMY_STRING,
                objectKey1:{
                    dummyVal11: DUMMY_STRING,
                    dummyVal12: DUMMY_NUMBER_MRG
                },
                objectKey2:{
                    dummyVal21: DUMMY_STRING,
                    dummyVal22: DUMMY_NUMBER
                }
            }

            const actual = mergeOpts(testOpts, defaultTestOpts)
            expect(actual).to.deep.equal(expected)
        })
    })
})