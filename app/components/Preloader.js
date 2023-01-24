import Component from '../classes/Component';

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

        });
    }

    destroy(){
        this.element.parentNode.removeChild(this.element);
    }

}
