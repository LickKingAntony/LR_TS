// 1. Сначала описываем общий интерфейс источника
export interface ISource {
    id: string | null;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

// 2. Используем его внутри статьи
export interface IArticle {
    source: ISource; // Теперь конфликта не будет, тип совпадает
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content?: string;
}

// 3. Интерфейсы ответов API
export interface ISourcesResponse {
    status: string;
    sources: ISource[];
}

export interface INewsResponse {
    status: string;
    totalResults: number;
    articles: IArticle[];
}