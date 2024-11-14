export interface ResearchItem {
  collectionId: string;
  collectionName: string;
  content: string;
  created: string;
  description: string;
  id: string;
  image: string;
  category: string;
  keywords: string;
  public: boolean;
  slug: string;
  status: string;
  title: string;
  updated: string;
}

export interface ResearchCategoryItem {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  title: string;
  updated: string;
}
