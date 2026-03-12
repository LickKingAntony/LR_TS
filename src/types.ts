

export interface ISource {
    id: string;
    name: string;
}

export interface ISourcesResponse {
    status: string;
    sources: ISource[];
}

export interface IArticle {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    source: ISource;
}

export interface INewsResponse {
    status: string;
    totalResults: number;
    articles: IArticle[];
}