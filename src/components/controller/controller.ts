import AppLoader from './appLoader';
import { INewsResponse, ISourcesResponse } from '../../types'; 

class AppController extends AppLoader {
    
    public getSources(callback: (data: ISourcesResponse) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    
    public getNews(e: Event, callback: (data: INewsResponse) => void): void {
        let target = e.target as HTMLElement; // Приведение к HTMLElement для доступа к classList
        const newsContainer = e.currentTarget as HTMLElement;

        // Цикл для делегирования событий (всплытие до нужного элемента)
        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                // Проверяем, что ID существует и не совпадает с текущим выбранным
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            
            // Если родителя нет (вышли за пределы DOM), прерываем цикл
            if (target.parentNode === null) break;
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;