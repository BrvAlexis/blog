export type DataType = {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  authorId: string;
  authorName: string;
  createdAt: string;
};

export type DataFormType = Omit<DataType, "id" | "authorId" | "authorName" | "createdAt">;

export type DbContextType = {
  articles: DataType[];
  addArticle: (article: Omit<DataType, "id">) => Promise<void>;
  updateArticle: (article: DataType) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  data: DataType[];
};

export type Params = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
};

export type UpdatePageProps = {
  params: Params;
};
