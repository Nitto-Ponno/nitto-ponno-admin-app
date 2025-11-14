export type TCategory = {
  _id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  subCategories: TCategory[];
  isDeleted: boolean;
  isFeatured: boolean;
  image: string;
  description: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};
