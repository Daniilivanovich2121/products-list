export interface Product {
  id?: number;
  price: number;
  title: string;
  description: string;
  slug: string;
  image: string[];
  categoryId: number;
}
export interface  CreateProductModels {
  price: number;
  title: string;
  description: string;
  image: string[];
  categoryId: number;
}
