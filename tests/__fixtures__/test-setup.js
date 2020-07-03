import getFlashSplash from '../../src/index'

const flashSplash = getFlashSplash({
    splashContent: {
        cssText: 'width:300px;height:300px',
        innerHTML: '',
        img: './test-image.jpg'
    },
    root: {
        innerHTML: '<div style="color: white; font-size: 30px; padding:20px; background-color: red;">ROOT</div>'
    }
})

const btn = document.createElement('button')
const splash = document.getElementById('splash')

btn.id = 'btn'
btn.innerText = 'READY'

btn.addEventListener('click', () => {
    flashSplash.ready()
})

splash.appendChild(btn)
