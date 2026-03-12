import './news.css';
import { IArticle } from '../../../types'; 

class News {
    /**
     * Отрисовывает новости на странице
     * @param data - массив статей
     */
    public draw(data: IArticle[]): void {
        // Ограничиваем количество новостей до 10
        const news: IArticle[] = data.length >= 10 ? data.filter((_, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item: IArticle, idx: number): void => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            // Добавляем альтернирующий класс для четных элементов
            const itemContainer = newsClone.querySelector('.news__item');
            if (idx % 2 && itemContainer) {
                itemContainer.classList.add('alt');
            }

            // Установка фонового изображения
            const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
            if (metaPhoto) {
                metaPhoto.style.backgroundImage = `url(${
                    item.urlToImage || 'img/news_placeholder.jpg'
                })`;
            }

            // Автор и Дата
            const metaAuthor = newsClone.querySelector('.news__meta-author');
            if (metaAuthor) {
                metaAuthor.textContent = item.author || item.source.name;
            }

            const metaDate = newsClone.querySelector('.news__meta-date');
            if (metaDate) {
                metaDate.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
            }

            // Контент новости
            const title = newsClone.querySelector('.news__description-title');
            if (title) title.textContent = item.title;

            const source = newsClone.querySelector('.news__description-source');
            if (source) source.textContent = item.source.name;

            const content = newsClone.querySelector('.news__description-content');
            if (content) content.textContent = item.description;

            const link = newsClone.querySelector('.news__read-more a');
            if (link) link.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;