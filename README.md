![](_art/flash-splash-icon-sm.png) 


FLASH-SPLASH
============

[![vladblindu](https://circleci.com/gh/vladblindu/flash-splash.svg?style=shield)](https://circleci.com/gh/vladblindu/flash-splash)


This utility generates a splash screen that will be displayed until the **ready** method is being called, then fades out while the main "#root"
element fades in. Useful in SPA's that have long loading times. 
0 dependencies

### Usage

```javascript
const getFlashSplash = require('@vladblindu/flash-splash')

const opts = {
    
    splash: {
        innerHTML: '',  // the splash overlay's innerHTML
        cssText: ''     // the splash overlay's css as string
    },
    splashContent: {
        innerHTML: '',  // the splash content div's innerHTML
        cssText: '',     // the splash content div's css as string
        img: '' // the splash image path
    },
    root: {
        innerHTML: '',  // the root overlay's innerHTML
        cssText: ''     // the root overlay's css as string
    },
    minShowTime: 1000 //the minimum time the splash screen is displayed (supposing the app loads faster than this)
    transitionTime: 500, // time of the fade transition
    cleanupDelay: 200, // time until the splash element is removed from the DOM and the current function is removed from the global window object
}

const flashSplash = getFlashSplash(opts)
```

The **flashSplash** instance will be a singleton, so requiring it again it won spawn another instance, but will return the same one
When the app is ready to be shown (everything loaded, DOM mounted, auth solved) just call
```
flashSplash.ready()
```

###Tests
Interactive with Cypress: 
```bash
 yarn test
```
Continuous integration testing: 
```bash
 yarn run test-headless
```
