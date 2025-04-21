export interface Product {
  quantity: number;
  name: string;
  id?: number;
  price: number;
  title: string;
  description: string;
  slug: string;
  images: string[];
  categoryId: number;
}
export interface  CreateProductModels {
  price: number;
  title: string;
  description: string;
  images: string[];
  categoryId: number;
}
