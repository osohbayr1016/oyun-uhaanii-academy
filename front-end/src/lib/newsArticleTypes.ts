export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  publishedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}
