import AppController from '../controller/controller';
import { AppView } from '../view/appView';


export interface ISource {
    id: string;
    name: string;
}

export interface IArticle {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    source: ISource;
}

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesContainer = document.querySelector('.sources');

        if (sourcesContainer instanceof HTMLElement) {
            sourcesContainer.addEventListener('click', (e: Event): void => 
                this.controller.getNews(e, (data) => this.view.drawNews(data))
            );
        }

        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;