import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        
        super('https://newsapi.org/v2/', {
            apiKey: '9369b42dd1684daf9acb1845732c9dc1', 
        });
    }
}

export default AppLoader;