export interface ProductModel {
  product?: string;
  image?: string;
  retailPrice?: number;
  description?: string;
  id?: string;
  unit?: string;
}

export interface CategoryModel {
  description: string;
  id: string;
  name: string;
}
