import './style.css'
import arrowAnimate from '../static/assets/arrowAnimate.gif'
import Experience from './Experience/Experience.js'

window.experience = new Experience({
    targetElement: document.querySelector('.experience')
})

//新增html元素
const arrowGif = document.createElement('img');
arrowGif.src = arrowAnimate;
document.body.appendChild(arrowGif);
arrowGif.style.position = 'absolute';
arrowGif.style.bottom = '0';
arrowGif.style.right = '0';
arrowGif.style.width = '70px';
arrowGif.style.height = '70px';
arrowGif.style.left = '3%',
arrowGif.style.bottom = '4%';
