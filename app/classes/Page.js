import GSAP from 'gsap';

export default class Page{
    constructor({
                    element,
                    elements,
                    id
                }){
        this.selector = element;
        this.selectorChildren = {
            ...elements,

        };

        this.id = id;
    }

    create(){
        this.element = document.querySelector(this.selector);
        this.elements = {};

        for(const [key, entry] of Object.entries(this.selectorChildren)){
            if(entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)){
                this.elements[key] = entry;
            }else{
                this.elements[key] = this.element.querySelectorAll(entry);

                if(this.elements[key].length === 0){
                    this.elements[key] = null;
                }else if(this.elements[key].length === 1){
                    this.elements[key] = this.element.querySelector(entry);
                }
            }
        }
    }


    /**
     * Animations.
     */

    show(){
        return new Promise(resolve => {
            this.animationIn = GSAP.timeline();

            GSAP.fromTo(this.element, {
                autoAlpha: 0
            }, {
                autoAlpha: 1,
            });

            this.animationIn.call(() => {
                resolve();
            });
        });
    }

    hide(){
        return new Promise(resolve => {
            this.animationOut = GSAP.timeline();

            this.animationOut.to(this.element, {
                autoAlpha: 0,
                onComplete: resolve
            });
        });
    }

    /*
      Listeners.
     */

    addEventListeners(){
    }

    removeEventListeners(){
    }

    /**
     * Destroy.
     */

    destroy(){
        this.removeEventListeners();
    }
}

