export interface TAttributeOption {
  value: string;
  id?: string;
}

export interface TAttribute {
  _id: string;
  name: string;
  slug: string;
  description: string;
  options: TAttributeOption[];
  createdAt: string;
  updatedAt: string;
}
