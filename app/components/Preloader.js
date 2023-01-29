import Component from '../classes/Component';
import GSAP from 'gsap';

export default class Preloader extends Component{
    constructor(){
        super({
            element: '.preloader',
            elements: {
                title: '.preloader__text',
                number: '.preloader__number',
                numberText: '.preloader__number__text',
                images: document.querySelectorAll('img')
            }
        });

        this.length = 0;

        this.createLoader();
    }

    createLoader(){
        // not images
        if(!this.elements.images.length){
            this.elements.numberText.innerHTML = `100%`;

            setTimeout(this.onLoaded.bind(this), 500);
            return;
        }

        this.elements.images.forEach(element => {
            element.onload = () => this.onAssetLoaded(element);
            element.src = element.getAttribute('data-src');
        });
    }

    onAssetLoaded(){
        this.length += 1;

        const percentage = this.length / this.elements.images.length;

        this.elements.numberText.innerHTML = `${Math.round(percentage * 100)}%`;

        if(percentage === 1){
            this.onLoaded();
        }
    }

    onLoaded(){
        return new Promise(resolve => {
            GSAP.to(this.element, {
                autoAlpha: 0,
            });
        });
    }

    destroy(){
        this.element.parentNode.removeChild(this.element);
    }

}
