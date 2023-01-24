import Home from './pages/Home/index';
import Preloader from './components/Preloader';

class App{
    constructor(){
        this.createContent();

        this.createPreloader();
        this.createPages();

        this.addEventListeners();

        this.addLinkListeners();
    }


    // get content and template from different pages
    createContent(){
        this.content = document.querySelector('.content');
        this.template = this.content.getAttribute('data-template'); // this.content.dataset.template is the equivalent but not supported for Safari
    }

    createPages(){
        this.pages = {
            home: new Home()
        };

        // create a routing with AJAX and gives single page app behaviour
        this.page = this.pages[this.template];
        this.page.create();
    }

    createPreloader(){
        this.preloader = new Preloader();
    }

    /*
    Events
    */

    onPreloaded(){
        this.preloader.destroy();

        this.onResize();

        this.page.show();
    }

    async onChange({url, push = true}){
        await this.page.hide();
        const request = await window.fetch(url);

        if(request.status === 200){
            const html = await request.text();
            const div = document.createElement('div');

            div.innerHTML = html;

            const divContent = div.querySelector('.content');

            this.template = divContent.getAttribute('data-template');

            this.content.setAttribute('data-template', this.template);
            this.content.innerHTML = divContent.innerHTML;

            this.page = this.pages[this.template];
            this.page.create();

            this.onResize();

            this.page.show();

            this.addLinkListeners();
        }else{
            console.log("Error!");
        }
    }

    onResize(){
    }

    onPopState(){
        this.onChange({url: window.location.pathname, push: false});
    }


    /*
    Listeners
    */
    addEventListeners(){
        window.addEventListener('resize', this.onResize.bind(this));
    }

    addLinkListeners(){
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.onclick = event => {
                const {href} = link;
                event.preventDefault();

                this.onChange({url: href});
            };
        });
    }
}

new App();