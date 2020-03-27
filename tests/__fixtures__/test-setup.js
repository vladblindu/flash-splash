import flashSplash from '../../index'
import {splashTime, cleanupTime} from './test-config.json'

const splashContent = {
    cssText: 'width:300px;height:300px',
    innerHtml: '',
    img: './test-image.jpg'
}

flashSplash(window, {splashContent, splashTime, cleanupTime})