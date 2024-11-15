export type DataType = {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  authorName: string;
  authorId: string;
  createdAt: string;
};


export type DataFormType = {
  title: string;
  description: string;
  category: string;
  image?: string;
};

export type DbContextType = {
  data: DataType[];
  addArticle: (articleData: Omit<DataType, "id">) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  updateArticle: (article: DataType) => Promise<void>;
  articles: DataType[];
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
