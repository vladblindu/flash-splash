![](_art/flash-splash-icon-sm.png) 


FLASH-SPLASH
============

[![vladblindu](https://circleci.com/gh/vladblindu/flash-splash.svg?style=shield)](https://circleci.com/gh/vladblindu/flash-splash)


Utility that generates a splash screen that will be displayed until the "splashTime" expires, then fades out while the main "#root"
element fades in. Useful in SPA's that have long load times. 
0 dependencies

### Usage

```javascript
const flashSplash =require('flash-splash')

const opts = {
    
    splash: {
        innerHtml: '',  // the splash overlay's innerHtml
        cssText: ''     // the splash overlay's css as string
    },
    splashContent: {
        innerHtml: '',  // the splash content div's innerHtml
        cssText: '',     // the splash content div's css as string
        img: '' // the splash image path
    },
    root: {
        innerHtml: '',  // the root overlay's innerHtml
        cssText: ''     // the root overlay's css as string
    },
    splashTime: 1000, // time to display the splash in ms
    cleanupTime: 1000, // time until the splash element is removed from the DOM and the current function is removed from the global window object
}

flashSplash(window, opts)
```

The splashTime defaults to 1s and the cleanupTime to 200ms
###Tests
Interactive with Cypress: 
```bash
 yarn test
```
Continuous integration testing: 
```bash
 yarn run test-headless
```